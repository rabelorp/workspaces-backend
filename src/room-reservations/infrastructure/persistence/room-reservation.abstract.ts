import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RoomReservation } from '../../domain/room-reservation';

export abstract class RoomReservationRepository {
  abstract create(
    data: Omit<RoomReservation, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<RoomReservation>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[RoomReservation[], number]>;

  abstract findAll(
    id: RoomReservation['id'],
  ): Promise<NullableType<RoomReservation[]>>;

  abstract findById(
    id: RoomReservation['id'],
  ): Promise<NullableType<RoomReservation>>;

  abstract update(
    id: RoomReservation['id'],
    payload: DeepPartial<RoomReservation>,
  ): Promise<RoomReservation | null>;

  abstract remove(id: RoomReservation['id']): Promise<void>;
}
