import { Location } from '../../../../domain/location';
import { LocationEntity } from '../entities/location.entity';

export class LocationMapper {
  static toDomain(raw: LocationEntity): Location {
    const domainEntity = new Location();
    domainEntity.description = raw.description;
    domainEntity.capacity = raw.capacity;
    domainEntity.locationType = raw.locationType;
    domainEntity.locationName = raw.locationName;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Location): LocationEntity {
    const persistenceEntity = new LocationEntity();
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.capacity = domainEntity.capacity;
    persistenceEntity.locationType = domainEntity.locationType;
    persistenceEntity.locationType = domainEntity.locationType;

    persistenceEntity.locationName = domainEntity.locationName;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
