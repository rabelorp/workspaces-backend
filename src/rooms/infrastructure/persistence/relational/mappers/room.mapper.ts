import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { Room } from '../../../../domain/room';
import { RoomEntity } from '../entities/room.entity';

export class RoomMapper {
  static toDomain(raw: RoomEntity): Room {
    const domainEntity = new Room();
    domainEntity.exclusive = raw.exclusive;
    domainEntity.capacity = raw.capacity;
    domainEntity.roomName = raw.roomName;
    domainEntity.locationId = raw.location.id;
    domainEntity.photoId = raw.photoId;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Room): RoomEntity {
    const persistenceEntity = new RoomEntity();
    persistenceEntity.exclusive = domainEntity.exclusive;
    persistenceEntity.capacity = domainEntity.capacity;
    persistenceEntity.roomName = domainEntity.roomName;

    persistenceEntity.location = {
      id: domainEntity.locationId,
    } as LocationEntity;

    persistenceEntity.photoId = domainEntity.photoId;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
