import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { WorkStation } from '../../domain/work-station';

export abstract class WorkStationRepository {
  abstract create(
    data: Omit<WorkStation, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<WorkStation>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<WorkStation[]>;

  abstract findById(id: WorkStation['id']): Promise<NullableType<WorkStation>>;

  abstract update(
    id: WorkStation['id'],
    payload: DeepPartial<WorkStation>,
  ): Promise<WorkStation | null>;

  abstract remove(id: WorkStation['id']): Promise<void>;
}
