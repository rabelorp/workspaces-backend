import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Notification } from '../../../../domain/notification';
import { NotificationRepository } from '../../notification.abstract';
import { NotificationMapper } from '../mappers/notification.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class NotificationRelationalRepository
  implements NotificationRepository
{
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async create(data: Notification): Promise<Notification> {
    const persistenceModel = NotificationMapper.toPersistence(data);
    const newEntity = await this.notificationRepository.save(
      this.notificationRepository.create(persistenceModel),
    );
    return NotificationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Notification[], number]> {
    const [entities, totalItems] =
      await this.notificationRepository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
      });

    const data = entities.map((entity) => NotificationMapper.toDomain(entity));
    return [data, totalItems];
  }

  async findById(id: Notification['id']): Promise<NullableType<Notification>> {
    const entity = await this.notificationRepository.findOne({
      where: { id },
    });

    return entity ? NotificationMapper.toDomain(entity) : null;
  }

  async update(
    id: Notification['id'],
    payload: Partial<Notification>,
  ): Promise<Notification> {
    const entity = await this.notificationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.notificationRepository.save(
      this.notificationRepository.create(
        NotificationMapper.toPersistence({
          ...NotificationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NotificationMapper.toDomain(updatedEntity);
  }

  async remove(id: Notification['id']): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
