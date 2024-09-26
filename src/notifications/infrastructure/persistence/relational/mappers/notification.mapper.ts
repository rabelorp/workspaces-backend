import { Notification } from '../../../../domain/notification';
import { NotificationEntity } from '../entities/notification.entity';

export class NotificationMapper {
  static toDomain(raw: NotificationEntity): Notification {
    const domainEntity = new Notification();
    domainEntity.entity = raw.entity;
    domainEntity.action = raw.action;
    domainEntity.message = raw.message;
    domainEntity.userId = raw.userId;
    domainEntity.read = raw.read;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Notification): NotificationEntity {
    const persistenceEntity = new NotificationEntity();
    persistenceEntity.entity = domainEntity.entity;
    persistenceEntity.action = domainEntity.action;
    persistenceEntity.message = domainEntity.message;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.read = domainEntity.read;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
