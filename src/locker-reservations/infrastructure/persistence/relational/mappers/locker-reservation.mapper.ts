import { LockerReservation } from '../../../../domain/locker-reservation';
import { LockerReservationEntity } from '../entities/locker-reservation.entity';

export class LockerReservationMapper {
  static toDomain(raw: LockerReservationEntity): LockerReservation {
    const domainEntity = new LockerReservation();
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.reservationDate = raw.reservationDate;
    domainEntity.observation = raw.observation;
    domainEntity.reservationTime = raw.reservationTime;
    domainEntity.userId = raw.userId;
    domainEntity.reservationStatus = raw.reservationStatus;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: LockerReservation,
  ): LockerReservationEntity {
    const persistenceEntity = new LockerReservationEntity();
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    persistenceEntity.reservationDate = domainEntity.reservationDate;
    persistenceEntity.observation = domainEntity.observation;
    persistenceEntity.reservationTime = domainEntity.reservationTime;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.reservationStatus = domainEntity.reservationStatus;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
