import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { WorkStation } from '../../../../domain/work-station';
import { WorkStationEntity } from '../entities/work-station.entity';

export class WorkStationMapper {
  static toDomain(raw: WorkStationEntity): WorkStation {
    const domainEntity = new WorkStation();
    domainEntity.activate = raw.activate;
    domainEntity.photoId = raw.photoId;
    domainEntity.locationId = raw.location.id;
    domainEntity.stationName = raw.stationName;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: WorkStation): WorkStationEntity {
    const persistenceEntity = new WorkStationEntity();
    persistenceEntity.activate = domainEntity.activate;
    persistenceEntity.photoId = domainEntity.photoId;

    persistenceEntity.location = {
      id: domainEntity.locationId,
    } as LocationEntity;

    persistenceEntity.stationName = domainEntity.stationName;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
