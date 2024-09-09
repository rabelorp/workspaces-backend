import { Garage } from '../../../../domain/garage';
import { GarageEntity } from '../entities/garage.entity';

export class GarageMapper {
  static toDomain(raw: GarageEntity): Garage {
    const domainEntity = new Garage();
    domainEntity.locationId = raw.locationId;
    domainEntity.garageName = raw.garageName;
    domainEntity.capacity = raw.capacity;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Garage): GarageEntity {
    const persistenceEntity = new GarageEntity();
    persistenceEntity.locationId = domainEntity.locationId;
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
