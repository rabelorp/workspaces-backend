import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { WorkStationReservation } from '../../domain/work-station-reservation';

export abstract class WorkStationReservationRepository {
  abstract create(
    data: Omit<
      WorkStationReservation,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Promise<WorkStationReservation>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[WorkStationReservation[], number]>;

  abstract findAll(
    id: WorkStationReservation['id'],
  ): Promise<NullableType<WorkStationReservation[]>>;

  abstract findById(
    id: WorkStationReservation['id'],
    includeDeleted?: boolean,
  ): Promise<NullableType<WorkStationReservation>>;

  abstract update(
    id: WorkStationReservation['id'],
    payload: DeepPartial<WorkStationReservation>,
  ): Promise<WorkStationReservation | null>;

  abstract remove(id: WorkStationReservation['id']): Promise<void>;

  abstract validateReservationAvailability(
    workstationId: WorkStationReservation['workstationId'],
    reservationTime: WorkStationReservation['reservationTime'],
    reservationDate: WorkStationReservation['reservationDate'],
    id?: WorkStationReservation['id'],
  ): Promise<NullableType<WorkStationReservation[]>>;
}
