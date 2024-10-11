import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { CheckIn } from '../../domain/check-in';

export abstract class CheckInRepository {
  abstract create(
    data: Omit<CheckIn, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<CheckIn>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CheckIn[]>;

  abstract findById(id: CheckIn['id']): Promise<NullableType<CheckIn>>;

  abstract update(
    id: CheckIn['id'],
    payload: DeepPartial<CheckIn>,
  ): Promise<CheckIn | null>;

  abstract remove(id: CheckIn['id']): Promise<void>;
}
