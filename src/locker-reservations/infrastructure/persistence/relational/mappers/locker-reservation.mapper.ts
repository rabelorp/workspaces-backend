import { LockerEntity } from 'src/lockers/infrastructure/persistence/relational/entities/locker.entity';
import { LockerReservation } from '../../../../domain/locker-reservation';
import { LockerReservationEntity } from '../entities/locker-reservation.entity';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerDto } from 'src/lockers/dto/create-locker.dto';

export class LockerReservationMapper {
  static toDomain(raw: LockerReservationEntity): LockerReservation {
    const domainEntity = new LockerReservation();
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.reservationDate = raw.reservationDate;
    domainEntity.observation = raw.observation;
    domainEntity.reservationTime = raw.reservationTime;

    domainEntity.locker = new CreateLockerDto();
    domainEntity.locker.id = raw.locker?.id;
    domainEntity.locker.lockerName = raw.locker?.lockerName;

    domainEntity.location = new CreateLocationDto();
    domainEntity.location.id = raw.locker?.location?.id;
    domainEntity.location.locationName = raw.locker?.location?.locationName;

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

    persistenceEntity.locker = {
      id: domainEntity.lockerId,
    } as LockerEntity;

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
