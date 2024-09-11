import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { Garage } from '../../../../domain/garage';
import { GarageEntity } from '../entities/garage.entity';

export class GarageMapper {
  static toDomain(raw: GarageEntity): Garage {
    const domainEntity = new Garage();
    domainEntity.garageType = raw.garageType;
    domainEntity.photoId = raw.photoId;
    domainEntity.locationId = raw.location.id;
    domainEntity.garageName = raw.garageName;
    domainEntity.capacity = raw.capacity;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Garage): GarageEntity {
    const persistenceEntity = new GarageEntity();
    persistenceEntity.garageType = domainEntity.garageType;
    persistenceEntity.photoId = domainEntity.photoId;

    persistenceEntity.location = {
      id: domainEntity.locationId,
    } as LocationEntity;

    persistenceEntity.garageName = domainEntity.garageName;
    persistenceEntity.capacity = domainEntity.capacity;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
