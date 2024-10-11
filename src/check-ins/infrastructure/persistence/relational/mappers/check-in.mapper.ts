import { CheckIn } from '../../../../domain/check-in';
import { CheckInEntity } from '../entities/check-in.entity';

export class CheckInMapper {
  static toDomain(raw: CheckInEntity): CheckIn {
    const domainEntity = new CheckIn();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: CheckIn): CheckInEntity {
    const persistenceEntity = new CheckInEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
