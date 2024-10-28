import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { LockerReservation } from '../../domain/locker-reservation';

export abstract class LockerReservationRepository {
  abstract create(
    data: Omit<
      LockerReservation,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Promise<LockerReservation>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[LockerReservation[], number]>;

  abstract findAll(
    id: LockerReservation['id'],
  ): Promise<NullableType<LockerReservation[]>>;

  abstract findById(
    id: LockerReservation['id'],
    includeDeleted?: boolean,
  ): Promise<NullableType<LockerReservation>>;

  abstract update(
    id: LockerReservation['id'],
    payload: DeepPartial<LockerReservation>,
  ): Promise<LockerReservation | null>;

  abstract remove(id: LockerReservation['id']): Promise<void>;

  abstract validateReservationAvailability(
    lockerId: LockerReservation['lockerId'],
    reservationTime: LockerReservation['reservationTime'],
    reservationDate: LockerReservation['reservationDate'],
  ): Promise<NullableType<LockerReservation[]>>;
}
