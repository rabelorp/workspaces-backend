import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InfinityPaginationResponseDto<T> {
  data: T[];
  hasNextPage: boolean;
  currentPage!: number;
  totalPages!: number;
  totalItems!: number;
}

export function InfinityPaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({ type: [classReference] })
    data!: T[];

    @ApiProperty({
      type: Boolean,
      example: true,
    })
    hasNextPage: boolean;

    @ApiProperty({
      example: 1,
      description: 'A página atual',
    })
    currentPage!: number;

    @ApiProperty({
      example: 10,
      description: 'O número total de páginas',
    })
    totalPages!: number;

    @ApiProperty({
      example: 100,
      description: 'O número total de itens',
    })
    totalItems!: number;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `InfinityPagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
