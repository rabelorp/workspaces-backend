import { LockerReservation } from '../../../../domain/locker-reservation';
import { LockerReservationEntity } from '../entities/locker-reservation.entity';

export class LockerReservationMapper {
  static toDomain(raw: LockerReservationEntity): LockerReservation {
    const domainEntity = new LockerReservation();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: LockerReservation,
  ): LockerReservationEntity {
    const persistenceEntity = new LockerReservationEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
