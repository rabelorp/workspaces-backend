import {
  ActionNotification,
  EntityNotification,
  NotificationData,
} from '@interfaces/notifications.interface';
import { ReservationTime } from '@interfaces/reservation-time.enum';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from 'src/locations/locations.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
    @Inject('EMAIL_SERVICE')
    private readonly emailClient: ClientProxy,
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
    private readonly userService: UsersService,
    private readonly locationService: LocationsService,
    private readonly roomService: RoomsService,
  ) {}

  private generateNotificationMessage(
    firstName: string,
    lastName: string,
    action: ActionNotification,
    entity: EntityNotification,
    reservationId: string,
  ): string {
    let actionVerb: string;
    let entityName: string;

    switch (action) {
      case ActionNotification.CREATE:
        actionVerb = 'fez uma reserva';
        break;
      case ActionNotification.UPDATE:
        actionVerb = 'atualizou uma reserva';
        break;
      case ActionNotification.DELETE:
        actionVerb = 'deletou uma reserva';
        break;
      default:
        actionVerb = 'realizou uma ação';
    }

    switch (entity) {
      case EntityNotification.ROOM:
        entityName = 'na sala de reunião';
        break;
      case EntityNotification.WORKSTATION:
        entityName = 'na estação de trabalho';
        break;
      case EntityNotification.GARAGE:
        entityName = 'na garagem';
        break;
      case EntityNotification.LOCKER:
        entityName = 'no armário';
        break;
      case EntityNotification.USER:
        entityName = 'no usuário';
        break;
      default:
        entityName = 'no recurso';
    }
    return `O usuário: ${firstName} ${lastName} ${actionVerb} ${entityName}. ${reservationId ? `ID da Reserva: ${reservationId}` : ''}
 `;
  }

  async handleNotification(
    savedReservation: any,
    action: ActionNotification,
    entity: EntityNotification,
  ) {
    const existingUser = await this.repositoryUser.findOne({
      where: { id: savedReservation.userId },
    });

    const notificationData: NotificationData = {
      userId: existingUser?.id,
      action: action,
      entity: entity,
      message: this.generateNotificationMessage(
        existingUser?.firstName || '',
        existingUser?.lastName || '',
        action,
        entity,
        savedReservation.id,
      ),
      createdAt: new Date(),
    };

    this.sendNotification(notificationData);

    const admins = await this.userService.findByRole(1);
    const user = await this.userService.findById(savedReservation.userId);
    const room = await this.roomService.findOne(savedReservation.roomId);

    const location = room
      ? await this.locationService.findOne(room.locationId)
      : null;

    for (const admin of admins) {
      if (admin.email) {
        const adminEmailData = {
          to: admin.email,
          data: {
            fullNameAdmin: `${admin?.firstName} ${admin?.lastName}`,
            positionAdmin: admin.position,
            fullNameUser: `${user?.firstName} ${user?.lastName}`,
            roomId: savedReservation.roomId,
            roomName: room?.roomName,
            roomLocation: location?.locationName,
            observation: savedReservation.observation,
            reservationDate: savedReservation.reservationDate,
            reservationTime: ReservationTime[savedReservation.reservationTime],
            admin: true,
          },
        };
        this.sendEmail(adminEmailData);
      }
    }

    if (user?.email) {
      const userEmailData = {
        to: user.email,
        data: {
          fullNameAdmin: `Aquilino Santos`,
          positionAdmin: 'Analista Financeiro',
          fullNameUser: `${user?.firstName} ${user?.lastName}`,
          roomId: savedReservation.roomId,
          roomName: room?.roomName,
          roomLocation: location?.locationName,
          observation: savedReservation.observation,
          reservationDate: savedReservation.reservationDate,
          reservationTime: ReservationTime[savedReservation.reservationTime],
        },
      };
      this.sendEmail(userEmailData);
    }
  }

  sendNotification(notificationData: any) {
    return this.notificationClient.emit('notifications', notificationData);
  }
  sendEmail(emailData: any) {
    return this.emailClient.emit('emails', emailData);
  }
}
