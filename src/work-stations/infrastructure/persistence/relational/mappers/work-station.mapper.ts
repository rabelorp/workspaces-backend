import { WorkStation } from '../../../../domain/work-station';
import { WorkStationEntity } from '../entities/work-station.entity';

export class WorkStationMapper {
  static toDomain(raw: WorkStationEntity): WorkStation {
    const domainEntity = new WorkStation();
    domainEntity.location = raw.location;
    domainEntity.stationName = raw.stationName;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: WorkStation): WorkStationEntity {
    const persistenceEntity = new WorkStationEntity();
    persistenceEntity.location = domainEntity.location;
    persistenceEntity.stationName = domainEntity.stationName;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
