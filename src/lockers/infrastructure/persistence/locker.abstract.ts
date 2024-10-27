import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Locker } from '../../domain/locker';

export abstract class LockerRepository {
  abstract create(
    data: Omit<Locker, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Locker>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Locker[], number]>;

  abstract findById(
    id: Locker['id'],
    includeDeleted?: boolean,
  ): Promise<NullableType<Locker>>;

  abstract update(
    id: Locker['id'],
    payload: DeepPartial<Locker>,
  ): Promise<Locker | null>;

  abstract remove(id: Locker['id']): Promise<void>;
}
