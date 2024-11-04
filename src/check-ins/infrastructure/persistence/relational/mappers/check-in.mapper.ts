import { CheckIn } from '../../../../domain/check-in';
import { CheckInEntity } from '../entities/check-in.entity';

export class CheckInMapper {
  static toDomain(raw: CheckInEntity): CheckIn {
    const domainEntity = new CheckIn();
    domainEntity.lockerReservationId = raw.lockerReservationId ?? null;

    domainEntity.reservationId = raw.reservationId;
    domainEntity.checkInDate = raw.checkInDate;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: CheckIn): CheckInEntity {
    const persistenceEntity = new CheckInEntity();
    persistenceEntity.lockerReservationId =
      domainEntity.lockerReservationId ?? null;

    persistenceEntity.reservationId = domainEntity.reservationId;
    persistenceEntity.checkInDate = domainEntity.checkInDate;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
