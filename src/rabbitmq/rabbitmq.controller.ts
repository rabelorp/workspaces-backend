import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Controller()
export class RabbitmqController {
  private readonly logger = new Logger(RabbitmqController.name);
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('notifications')
  async handleNotifications(
    @Payload() data: CreateNotificationDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const result = await this.notificationsService.create(data);

      if (result) {
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
}
