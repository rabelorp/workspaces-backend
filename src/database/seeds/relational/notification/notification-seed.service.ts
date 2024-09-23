import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../../../../notifications/infrastructure/persistence/relational/entities/notification.entity';
import { Repository } from 'typeorm';
import { NotificationData } from '@interfaces/notifications.interface';
@Injectable()
export class NotificationSeedService {
  constructor(
    @InjectRepository(NotificationEntity)
    private repository: Repository<NotificationEntity>,
  ) {}

  private notificationData: NotificationData;

  createRandomNotification(notificationData: NotificationData) {
    this.notificationData = notificationData;
  }

  async run() {
    await this.repository.save({
      ...this.notificationData,
      read: false,
    });
  }
}
