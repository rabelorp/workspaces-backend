import { Locker } from '../../../../domain/locker';
import { LockerEntity } from '../entities/locker.entity';

export class LockerMapper {
  static toDomain(raw: LockerEntity): Locker {
    const domainEntity = new Locker();
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.lockerName = raw.lockerName;
    domainEntity.locationId = raw.locationId;
    domainEntity.photoId = raw.photoId;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Locker): LockerEntity {
    const persistenceEntity = new LockerEntity();
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    persistenceEntity.lockerName = domainEntity.lockerName;
    persistenceEntity.locationId = domainEntity.locationId;
    persistenceEntity.photoId = domainEntity.photoId;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
