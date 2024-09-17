import { RoomEntity } from 'src/rooms/infrastructure/persistence/relational/entities/room.entity';
import { RoomReservation } from '../../../../domain/room-reservation';
import { RoomReservationEntity } from '../entities/room-reservation.entity';

export class RoomReservationMapper {
  static toDomain(raw: RoomReservationEntity): RoomReservation {
    const domainEntity = new RoomReservation();
    domainEntity.additionals = raw.additionals;
    domainEntity.reservationStatus = raw.reservationStatus;
    domainEntity.userId = raw.userId;
    domainEntity.observation = raw.observation;
    domainEntity.roomId = raw.room.id;
    domainEntity.reservationDate = raw.reservationDate;
    domainEntity.reservationTime = raw.reservationTime;
    domainEntity.userId = raw.userId;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: RoomReservation): RoomReservationEntity {
    const persistenceEntity = new RoomReservationEntity();
    persistenceEntity.additionals = domainEntity.additionals;
    persistenceEntity.reservationStatus = domainEntity.reservationStatus;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.observation = domainEntity.observation;

    persistenceEntity.room = { id: domainEntity.roomId } as RoomEntity;

    persistenceEntity.reservationDate = domainEntity.reservationDate;
    persistenceEntity.reservationTime = domainEntity.reservationTime;
    persistenceEntity.userId = domainEntity.userId;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
