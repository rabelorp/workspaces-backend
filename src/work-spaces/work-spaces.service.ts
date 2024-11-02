import { Injectable } from '@nestjs/common';
import { CreateWorkSpacesDto } from './dto/create-work-spaces.dto';
import { UpdateWorkSpacesDto } from './dto/update-work-spaces.dto';
import { WorkSpacesRepository } from './infrastructure/persistence/work-spaces.abstract';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { WorkSpaces } from './domain/work-spaces';

@Injectable()
export class WorkSpacesService {
  constructor(private readonly workSpacesRepository: WorkSpacesRepository) {}

  create(createWorkSpacesDto: CreateWorkSpacesDto) {
    return this.workSpacesRepository.create(createWorkSpacesDto);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    const [data, totalItems] =
      await this.workSpacesRepository.findAllWithPagination({
        paginationOptions: {
          page: paginationOptions.page,
          limit: paginationOptions.limit,
        },
      });
    return {
      data,
      totalItems,
    };
  }

  findOne(id: WorkSpaces['id']) {
    return this.workSpacesRepository.findById(id);
  }

  update(id: WorkSpaces['id'], updateWorkSpacesDto: UpdateWorkSpacesDto) {
    return this.workSpacesRepository.update(id, updateWorkSpacesDto);
  }

  remove(id: WorkSpaces['id']) {
    return this.workSpacesRepository.remove(id);
  }
}
