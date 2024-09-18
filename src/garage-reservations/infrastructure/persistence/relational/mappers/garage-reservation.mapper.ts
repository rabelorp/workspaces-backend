import { GarageEntity } from 'src/garages/infrastructure/persistence/relational/entities/garage.entity';
import { GarageReservation } from '../../../../domain/garage-reservation';
import { GarageReservationEntity } from '../entities/garage-reservation.entity';
import { CreateGarageDto } from 'src/garages/dto/create-garage.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

export class GarageReservationMapper {
  static toDomain(raw: GarageReservationEntity): GarageReservation {
    const domainEntity = new GarageReservation();
    domainEntity.vehiclePlate = raw.vehiclePlate;
    domainEntity.reservationStatus = raw.reservationStatus;
    domainEntity.garageId = raw.garage.id;

    domainEntity.garage = new CreateGarageDto();
    domainEntity.garage.garageName = raw.garage.garageName;

    domainEntity.location = new CreateLocationDto();
    domainEntity.location.locationName = raw.garage?.location?.locationName;

    domainEntity.userId = raw.userId;
    domainEntity.observation = raw.observation;
    domainEntity.reservationTime = raw.reservationTime;
    domainEntity.reservationDate = raw.reservationDate;

    domainEntity.reservationDate = raw.reservationDate;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: GarageReservation,
  ): GarageReservationEntity {
    const persistenceEntity = new GarageReservationEntity();
    persistenceEntity.vehiclePlate = domainEntity.vehiclePlate;
    persistenceEntity.reservationStatus = domainEntity.reservationStatus;

    persistenceEntity.garage = {
      id: domainEntity.garageId,
    } as GarageEntity;

    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.observation = domainEntity.observation;
    persistenceEntity.reservationTime = domainEntity.reservationTime;
    persistenceEntity.reservationDate = domainEntity.reservationDate;

    persistenceEntity.reservationDate = domainEntity.reservationDate;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
