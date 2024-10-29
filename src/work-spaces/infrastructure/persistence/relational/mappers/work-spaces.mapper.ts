import { WorkSpaces } from '../../../../domain/work-spaces';
import { WorkSpacesEntity } from '../entities/work-spaces.entity';

export class WorkSpacesMapper {
  static toDomain(raw: WorkSpacesEntity): WorkSpaces {
    const domainEntity = new WorkSpaces();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: WorkSpaces): WorkSpacesEntity {
    const persistenceEntity = new WorkSpacesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
