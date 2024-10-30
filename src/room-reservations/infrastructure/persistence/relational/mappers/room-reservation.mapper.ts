import { RoomEntity } from 'src/rooms/infrastructure/persistence/relational/entities/room.entity';
import { RoomReservation } from '../../../../domain/room-reservation';
import { RoomReservationEntity } from '../entities/room-reservation.entity';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';
import { CreateLockerDto } from 'src/lockers/dto/create-locker.dto';
import { LockerReservationEntity } from 'src/locker-reservations/infrastructure/persistence/relational/entities/locker-reservation.entity';
import { CreateCheckInDto } from 'src/check-ins/dto/create-check-in.dto';
import { CheckInEntity } from 'src/check-ins/infrastructure/persistence/relational/entities/check-in.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

export class RoomReservationMapper {
  static toDomain(raw: RoomReservationEntity): RoomReservation {
    const domainEntity = new RoomReservation();

    domainEntity.lockerReservation = new CreateLockerReservationDto();
    domainEntity.lockerReservation.id = raw.lockerReservation?.id;

    domainEntity.lockerReservation.locker = new CreateLockerDto();
    domainEntity.lockerReservation.locker.id =
      raw.lockerReservation?.locker?.id;
    domainEntity.lockerReservation.locker.lockerName =
      raw.lockerReservation?.locker?.lockerName;

    domainEntity.lockerReservation.location = new CreateLocationDto();
    domainEntity.lockerReservation.location.id =
      raw.lockerReservation?.locker?.location?.id;
    domainEntity.lockerReservation.location.locationName =
      raw.lockerReservation?.locker?.location?.locationName;

    domainEntity.additionals = raw.additionals;
    domainEntity.reservationStatus = raw.reservationStatus;

    domainEntity.user = new CreateUserDto();
    domainEntity.user.id = raw.user.id;

    domainEntity.user.photo = new FileDto();
    domainEntity.user.photo.id = raw.user.photo?.id as string;
    domainEntity.user.photo.path = raw.user.photo?.path as string;

    domainEntity.observation = raw.observation;

    domainEntity.room = new CreateRoomDto();
    domainEntity.room.id = raw.room.id;
    domainEntity.room.roomName = raw.room.roomName;

    domainEntity.location = new CreateLocationDto();
    domainEntity.location.id = raw.room?.location?.id;
    domainEntity.location.locationName = raw.room?.location?.locationName;

    domainEntity.checkIn = new CreateCheckInDto();
    domainEntity.checkIn.id = raw.checkIn?.id;
    domainEntity.checkIn.checkInDate = raw.checkIn?.checkInDate;

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

    persistenceEntity.lockerReservation = {
      id: domainEntity.lockerReservationId,
    } as LockerReservationEntity;

    persistenceEntity.additionals = domainEntity.additionals;
    persistenceEntity.reservationStatus = domainEntity.reservationStatus;

    persistenceEntity.user = {
      id: domainEntity.userId,
    } as UserEntity;
    persistenceEntity.observation = domainEntity.observation;

    persistenceEntity.room = { id: domainEntity.roomId } as RoomEntity;

    persistenceEntity.checkIn = {
      id: domainEntity.checkInId,
    } as CheckInEntity;

    persistenceEntity.reservationDate = domainEntity.reservationDate;
    persistenceEntity.reservationTime = domainEntity.reservationTime;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
