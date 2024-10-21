import { IPaginationOptions } from './types/pagination-options';
import { InfinityPaginationResponseDto } from './dto/infinity-pagination-response.dto';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
  totalItems: number,
): InfinityPaginationResponseDto<T> => {
  const totalPages = Math.ceil(totalItems / options.limit);
  const hasNextPage = options.page < totalPages;
  return {
    data,
    hasNextPage,
    currentPage: options.page,
    totalPages,
    totalItems,
  };
};
