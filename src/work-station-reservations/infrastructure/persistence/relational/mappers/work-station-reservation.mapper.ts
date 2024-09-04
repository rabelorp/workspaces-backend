import { WorkStationReservation } from '../../../../domain/work-station-reservation';
import { WorkStationReservationEntity } from '../entities/work-station-reservation.entity';

export class WorkStationReservationMapper {
  static toDomain(raw: WorkStationReservationEntity): WorkStationReservation {
    const domainEntity = new WorkStationReservation();
    domainEntity.reservationStatus = raw.reservationStatus;
    domainEntity.observation = raw.observation;
    domainEntity.userId = raw.userId;
    domainEntity.reservationTime = raw.reservationTime;
    domainEntity.reservationDate = raw.reservationDate;
    domainEntity.workstationId = raw.workstationId;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: WorkStationReservation,
  ): WorkStationReservationEntity {
    const persistenceEntity = new WorkStationReservationEntity();
    persistenceEntity.reservationStatus = domainEntity.reservationStatus;
    persistenceEntity.observation = domainEntity.observation;
    persistenceEntity.userId = domainEntity.userId;
    persistenceEntity.reservationTime = domainEntity.reservationTime;
    persistenceEntity.reservationDate = domainEntity.reservationDate;
    persistenceEntity.workstationId = domainEntity.workstationId;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
