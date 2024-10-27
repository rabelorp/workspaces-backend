import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Room } from '../../domain/room';

export abstract class RoomRepository {
  abstract create(
    data: Omit<Room, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Room>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Room[], number]>;

  abstract findById(
    id: Room['id'],
    includeDeleted?: boolean,
  ): Promise<NullableType<Room>>;

  abstract update(
    id: Room['id'],
    payload: DeepPartial<Room>,
  ): Promise<Room | null>;

  abstract remove(id: Room['id']): Promise<void>;
}
