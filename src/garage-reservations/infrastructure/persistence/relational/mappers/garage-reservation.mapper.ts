import { GarageReservation } from '../../../../domain/garage-reservation';
import { GarageReservationEntity } from '../entities/garage-reservation.entity';

export class GarageReservationMapper {
  static toDomain(raw: GarageReservationEntity): GarageReservation {
    const domainEntity = new GarageReservation();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: GarageReservation,
  ): GarageReservationEntity {
    const persistenceEntity = new GarageReservationEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
