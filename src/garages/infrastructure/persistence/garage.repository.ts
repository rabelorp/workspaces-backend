import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Garage } from '../../domain/garage';

export abstract class GarageRepository {
  abstract create(
    data: Omit<Garage, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Garage>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Garage[]>;

  abstract findById(id: Garage['id']): Promise<NullableType<Garage>>;

  abstract update(
    id: Garage['id'],
    payload: DeepPartial<Garage>,
  ): Promise<Garage | null>;

  abstract remove(id: Garage['id']): Promise<void>;
}
