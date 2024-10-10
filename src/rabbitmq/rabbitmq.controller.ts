import { EntityNotification } from '@interfaces/notifications.interface';
import { MailService } from '@mail/mail.service';
import { Controller, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { GarageReservationRepository } from 'src/garage-reservations/infrastructure/persistence/garage-reservation.repository';
import { LockerReservationRepository } from 'src/locker-reservations/infrastructure/persistence/locker-reservation.repository';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { RoomReservationRepository } from 'src/room-reservations/infrastructure/persistence/room-reservation.repository';
import { WorkStationReservationRepository } from 'src/work-station-reservations/infrastructure/persistence/work-station-reservation.repository';

@Controller()
export class RabbitmqController {
  private readonly logger = new Logger(RabbitmqController.name);

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly mailService: MailService,
    private readonly garageReservationRepository: GarageReservationRepository,
    private readonly roomReservationRepository: RoomReservationRepository,
    private readonly lockerReservationRepository: LockerReservationRepository,
    private readonly workStationReservationRepository: WorkStationReservationRepository,
    private readonly configService: ConfigService,
  ) {}

  @MessagePattern('notifications')
  async handleNotifications(
    @Payload() data: CreateNotificationDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const notificationResult = await this.notificationsService.create(data);
      let updateResult: boolean = true;

      if (data.activate === false) {
        switch (data.entity) {
          case EntityNotification.GARAGE_RESERVATION:
            await this.garageReservationRepository.update(data.reservationId, {
              reservationStatus: 3,
            });
            break;
          case EntityNotification.LOCKER_RESERVATION:
            await this.lockerReservationRepository.update(data.reservationId, {
              reservationStatus: 3,
            });
            break;
          case EntityNotification.ROOM_RESERVATION:
            await this.roomReservationRepository.update(data.reservationId, {
              reservationStatus: 3,
            });
            break;
          case EntityNotification.WORKSTATION_RESERVATION:
            await this.workStationReservationRepository.update(
              data.reservationId,
              {
                reservationStatus: 3,
              },
            );
            break;
          default:
            updateResult = false;
            this.logger.warn('Unsupported entity type for reservation update');
        }
      }

      if (notificationResult && updateResult) {
        this.logger.log('Notification saved successfully');

        channel.ack(originalMessage);
      } else {
        this.logger.warn(
          'Notification saving failed, not acknowledging the message',
        );

        channel.nack(originalMessage);
      }
    } catch (error) {
      this.logger.error('Error processing notification:', error);

      channel.nack(originalMessage);
    }
  }

  @MessagePattern('emails')
  async handleEmails(@Payload() emailData: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const result = await this.mailService.confirmReservation({
        to: emailData.to,
        data: emailData.data,
      });

      if (result.accepted.length > 0) {
        this.logger.log('Email send successfully');

        channel.ack(originalMessage);
      } else {
        this.logger.warn('Email send failed, not acknowledging the message');

        channel.nack(originalMessage);
      }
    } catch (error) {
      this.logger.error('Error processing email:', error);

      channel.nack(originalMessage);
    }
  }
}
