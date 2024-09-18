import { Injectable } from '@nestjs/common';
import { CreateWorkStationDto } from './dto/create-work-station.dto';
import { UpdateWorkStationDto } from './dto/update-work-station.dto';
import { WorkStationRepository } from './infrastructure/persistence/work-station.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { WorkStation } from './domain/work-station';

@Injectable()
export class WorkStationsService {
  constructor(private readonly workStationRepository: WorkStationRepository) {}

  create(createWorkStationDto: CreateWorkStationDto) {
    return this.workStationRepository.create(createWorkStationDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.workStationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        filters: paginationOptions.filters,
      },
    });
  }

  findOne(id: WorkStation['id']) {
    return this.workStationRepository.findById(id);
  }

  update(id: WorkStation['id'], updateWorkStationDto: UpdateWorkStationDto) {
    return this.workStationRepository.update(id, updateWorkStationDto);
  }

  remove(id: WorkStation['id']) {
    return this.workStationRepository.remove(id);
  }
}
