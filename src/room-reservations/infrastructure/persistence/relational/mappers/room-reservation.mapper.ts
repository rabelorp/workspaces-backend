import { RoomReservation } from '../../../../domain/room-reservation';
import { RoomReservationEntity } from '../entities/room-reservation.entity';

export class RoomReservationMapper {
  static toDomain(raw: RoomReservationEntity): RoomReservation {
    const domainEntity = new RoomReservation();
    domainEntity.reservationStatus = raw.reservationStatus;
    domainEntity.userId = raw.userId;
    domainEntity.observation = raw.observation;
    domainEntity.roomId = raw.roomId;
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
    persistenceEntity.reservationStatus = domainEntity.reservationStatus;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.observation = domainEntity.observation;
    persistenceEntity.roomId = domainEntity.roomId;
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
