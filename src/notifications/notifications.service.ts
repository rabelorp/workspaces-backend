import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRepository } from './infrastructure/persistence/notification.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Notification } from './domain/notification';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationRepository.create(createNotificationDto);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    const [data, totalItems] =
      await this.notificationRepository.findAllWithPagination({
        paginationOptions: {
          page: paginationOptions.page,
          limit: paginationOptions.limit,
        },
      });
    return {
      data,
      totalItems,
    };
  }

  findOne(id: Notification['id']) {
    return this.notificationRepository.findById(id);
  }

  update(id: Notification['id'], updateNotificationDto: UpdateNotificationDto) {
    return this.notificationRepository.update(id, updateNotificationDto);
  }

  remove(id: Notification['id']) {
    return this.notificationRepository.remove(id);
  }
}
