import {
  ActionNotification,
  EntityNotification,
  NotificationData,
} from '@interfaces/notifications.interface';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
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
  }

  sendNotification(notificationData: any) {
    return this.client.emit('notifications', notificationData);
  }
  sendEmail(emailData: any) {
    return this.client.emit('emails', emailData);
  }
}
