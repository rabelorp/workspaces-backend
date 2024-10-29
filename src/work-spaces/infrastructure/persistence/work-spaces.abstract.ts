import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { WorkSpaces } from '../../domain/work-spaces';

export abstract class WorkSpacesRepository {
  abstract create(
    data: Omit<WorkSpaces, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<WorkSpaces>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[WorkSpaces[], number]>;

  abstract findById(id: WorkSpaces['id']): Promise<NullableType<WorkSpaces>>;

  abstract update(
    id: WorkSpaces['id'],
    payload: DeepPartial<WorkSpaces>,
  ): Promise<WorkSpaces | null>;

  abstract remove(id: WorkSpaces['id']): Promise<void>;
}
