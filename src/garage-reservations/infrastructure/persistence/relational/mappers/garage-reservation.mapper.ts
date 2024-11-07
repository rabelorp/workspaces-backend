import { GarageEntity } from 'src/garages/infrastructure/persistence/relational/entities/garage.entity';
import { GarageReservation } from '../../../../domain/garage-reservation';
import { GarageReservationEntity } from '../entities/garage-reservation.entity';
import { CreateGarageDto } from 'src/garages/dto/create-garage.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';
import { LockerReservationEntity } from 'src/locker-reservations/infrastructure/persistence/relational/entities/locker-reservation.entity';
import { CreateLockerDto } from 'src/lockers/dto/create-locker.dto';
import { CreateCheckInDto } from 'src/check-ins/dto/create-check-in.dto';
import { CheckInEntity } from 'src/check-ins/infrastructure/persistence/relational/entities/check-in.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

export class GarageReservationMapper {
  static toDomain(raw: GarageReservationEntity): GarageReservation {
    const domainEntity = new GarageReservation();
    domainEntity.deletedAt = raw.deletedAt;

    domainEntity.lockerReservation = new CreateLockerReservationDto();
    domainEntity.lockerReservation.id = raw.lockerReservation?.id;
    domainEntity.lockerReservation.reservationStatus =
      raw.lockerReservation?.reservationStatus;

    domainEntity.lockerReservation.locker = new CreateLockerDto();
    domainEntity.lockerReservation.locker.id =
      raw.lockerReservation?.locker?.id;
    domainEntity.lockerReservation.locker.lockerName =
      raw.lockerReservation?.locker?.lockerName;

    domainEntity.lockerReservation.location = new CreateLocationDto();
    domainEntity.lockerReservation.location.id =
      raw.lockerReservation?.locker?.location.id;
    domainEntity.lockerReservation.location.locationName =
      raw.lockerReservation?.locker?.location.locationName;

    domainEntity.vehiclePlate = raw.vehiclePlate;
    domainEntity.reservationStatus = raw.reservationStatus;

    domainEntity.garage = new CreateGarageDto();
    domainEntity.garage.id = raw.garage?.id;
    domainEntity.garage.garageName = raw.garage.garageName;
    domainEntity.garage.garageType = raw.garage.garageType;

    domainEntity.location = new CreateLocationDto();
    domainEntity.location.id = raw.garage?.location?.id;
    domainEntity.location.locationName = raw.garage?.location?.locationName;

    domainEntity.checkIn = new CreateCheckInDto();
    domainEntity.checkIn.id = raw.checkIn?.id;
    domainEntity.checkIn.checkInDate = raw.checkIn?.checkInDate;

    domainEntity.user = new CreateUserDto();
    domainEntity.user.id = raw.user.id;

    domainEntity.user.photo = new FileDto();
    domainEntity.user.photo.id = raw.user.photo?.id as string;
    domainEntity.user.photo.path = `${process.env.BACKEND_DOMAIN}${raw.user.photo?.path as string}`;

    domainEntity.observation = raw.observation;
    domainEntity.reservationTime = raw.reservationTime;
    domainEntity.reservationDate = raw.reservationDate;

    domainEntity.reservationDate = raw.reservationDate;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: GarageReservation,
  ): GarageReservationEntity {
    const persistenceEntity = new GarageReservationEntity();
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    persistenceEntity.lockerReservation = {
      id: domainEntity.lockerReservationId,
    } as LockerReservationEntity;

    persistenceEntity.vehiclePlate = domainEntity.vehiclePlate;
    persistenceEntity.reservationStatus = domainEntity.reservationStatus;

    persistenceEntity.garage = {
      id: domainEntity.garageId,
    } as GarageEntity;

    persistenceEntity.checkIn = {
      id: domainEntity.checkInId,
    } as CheckInEntity;

    persistenceEntity.user = {
      id: domainEntity.userId,
    } as UserEntity;

    persistenceEntity.observation = domainEntity.observation;
    persistenceEntity.reservationTime = domainEntity.reservationTime;
    persistenceEntity.reservationDate = domainEntity.reservationDate;

    persistenceEntity.reservationDate = domainEntity.reservationDate;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
