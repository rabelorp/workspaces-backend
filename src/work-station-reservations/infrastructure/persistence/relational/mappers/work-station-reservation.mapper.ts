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

export class WorkStationReservationMapper {
  static toDomain(raw: WorkStationReservationEntity): WorkStationReservation {
    const domainEntity = new WorkStationReservation();

    domainEntity.lockerReservation = new CreateLockerReservationDto();
    domainEntity.lockerReservation.id = raw.lockerReservation?.id;

    domainEntity.lockerReservation.locker = new CreateLockerDto();
    domainEntity.lockerReservation.locker.lockerName =
      raw.lockerReservation?.locker?.lockerName;

    domainEntity.lockerReservation.location = new CreateLocationDto();
    domainEntity.lockerReservation.location.locationName =
      raw.lockerReservation?.locker?.location?.locationName;

    domainEntity.reservationStatus = raw.reservationStatus;
    domainEntity.observation = raw.observation;
    domainEntity.userId = raw.userId;
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
    persistenceEntity.userId = domainEntity.userId;
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
