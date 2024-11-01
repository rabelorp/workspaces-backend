import { WorkStationEntity } from 'src/work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { WorkStationReservation } from '../../../../domain/work-station-reservation';
import { WorkStationReservationEntity } from '../entities/work-station-reservation.entity';
import { CreateWorkStationDto } from 'src/work-stations/dto/create-work-station.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';
import { CreateLockerDto } from 'src/lockers/dto/create-locker.dto';
import { LockerReservationEntity } from 'src/locker-reservations/infrastructure/persistence/relational/entities/locker-reservation.entity';
import { CreateCheckInDto } from 'src/check-ins/dto/create-check-in.dto';
import { CheckInEntity } from 'src/check-ins/infrastructure/persistence/relational/entities/check-in.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

export class WorkStationReservationMapper {
  static toDomain(raw: WorkStationReservationEntity): WorkStationReservation {
    const domainEntity = new WorkStationReservation();

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

    domainEntity.reservationStatus = raw.reservationStatus;
    domainEntity.observation = raw.observation;

    domainEntity.user = new CreateUserDto();
    domainEntity.user.id = raw.user.id;

    domainEntity.user.photo = new FileDto();
    domainEntity.user.photo.id = raw.user.photo?.id as string;
    domainEntity.user.photo.path = raw.user.photo?.path.length
      ? `${process.env.BACKEND_DOMAIN}${raw.user.photo?.path}  `
      : '';

    domainEntity.reservationTime = raw.reservationTime;
    domainEntity.reservationDate = raw.reservationDate;

    domainEntity.workstation = new CreateWorkStationDto();
    domainEntity.workstation.id = raw.workstation.id;
    domainEntity.workstation.stationName = raw.workstation.stationName;

    domainEntity.location = new CreateLocationDto();
    domainEntity.location.id = raw.workstation?.location?.id;
    domainEntity.location.locationName =
      raw.workstation?.location?.locationName;

    domainEntity.checkIn = new CreateCheckInDto();
    domainEntity.checkIn.id = raw.checkIn?.id;
    domainEntity.checkIn.checkInDate = raw.checkIn?.checkInDate;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: WorkStationReservation,
  ): WorkStationReservationEntity {
    const persistenceEntity = new WorkStationReservationEntity();

    persistenceEntity.lockerReservation = {
      id: domainEntity.lockerReservationId,
    } as LockerReservationEntity;

    persistenceEntity.reservationStatus = domainEntity.reservationStatus;
    persistenceEntity.observation = domainEntity.observation;

    persistenceEntity.user = {
      id: domainEntity.userId,
    } as UserEntity;

    persistenceEntity.reservationTime = domainEntity.reservationTime;
    persistenceEntity.reservationDate = domainEntity.reservationDate;

    persistenceEntity.workstation = {
      id: domainEntity.workstationId,
    } as WorkStationEntity;

    persistenceEntity.checkIn = {
      id: domainEntity.checkInId,
    } as CheckInEntity;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
