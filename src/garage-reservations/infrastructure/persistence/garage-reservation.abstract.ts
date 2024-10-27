import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { GarageReservation } from '../../domain/garage-reservation';

export abstract class GarageReservationRepository {
  abstract create(
    data: Omit<
      GarageReservation,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Promise<GarageReservation>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[GarageReservation[], number]>;

  abstract findAll(
    id: GarageReservation['id'],
  ): Promise<NullableType<GarageReservation[]>>;

  abstract findById(
    id: GarageReservation['id'],
    includeDeleted?: boolean,
  ): Promise<NullableType<GarageReservation>>;

  abstract update(
    id: GarageReservation['id'],
    payload: DeepPartial<GarageReservation>,
  ): Promise<GarageReservation | null>;

  abstract remove(id: GarageReservation['id']): Promise<void>;
}
