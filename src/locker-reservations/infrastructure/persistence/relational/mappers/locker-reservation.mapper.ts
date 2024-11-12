import { LockerEntity } from 'src/lockers/infrastructure/persistence/relational/entities/locker.entity';
import { LockerReservation } from '../../../../domain/locker-reservation';
import { LockerReservationEntity } from '../entities/locker-reservation.entity';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerDto } from 'src/lockers/dto/create-locker.dto';
import { CheckInEntity } from 'src/check-ins/infrastructure/persistence/relational/entities/check-in.entity';
import { CreateCheckInDto } from 'src/check-ins/dto/create-check-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

export class LockerReservationMapper {
  static toDomain(raw: LockerReservationEntity): LockerReservation {
    const domainEntity = new LockerReservation();
    domainEntity.deletedAt = raw.deletedAt;
    domainEntity.reservationDate = raw.reservationDate;
    domainEntity.observation = raw.observation;
    domainEntity.reservationTime = raw.reservationTime;

    domainEntity.locker = new CreateLockerDto();
    domainEntity.locker.id = raw.locker?.id;
    domainEntity.locker.lockerName = raw.locker?.lockerName;

    domainEntity.location = new CreateLocationDto();
    domainEntity.location.id = raw.locker?.location?.id;
    domainEntity.location.locationName = raw.locker?.location?.locationName;

    domainEntity.checkIn = new CreateCheckInDto();
    domainEntity.checkIn.id = raw.checkIn?.id;
    domainEntity.checkIn.checkInDate = raw.checkIn?.checkInDate;

    domainEntity.user = new CreateUserDto();
    domainEntity.user.id = raw.user.id;
    domainEntity.user.firstName = raw.user.firstName;
    domainEntity.user.lastName = raw.user.lastName;

    domainEntity.user.photo = new FileDto();
    domainEntity.user.photo.id = raw.user.photo?.id as string;
    domainEntity.user.photo.path = `${process.env.BACKEND_DOMAIN}${raw.user.photo?.path as string}`;

    domainEntity.reservationStatus = raw.reservationStatus;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: LockerReservation,
  ): LockerReservationEntity {
    const persistenceEntity = new LockerReservationEntity();
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    persistenceEntity.reservationDate = domainEntity.reservationDate;
    persistenceEntity.observation = domainEntity.observation;
    persistenceEntity.reservationTime = domainEntity.reservationTime;

    persistenceEntity.user = {
      id: domainEntity.userId,
    } as UserEntity;

    persistenceEntity.reservationStatus = domainEntity.reservationStatus;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.locker = {
      id: domainEntity.lockerId,
    } as LockerEntity;

    persistenceEntity.checkIn = {
      id: domainEntity.checkInId,
    } as CheckInEntity;

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
