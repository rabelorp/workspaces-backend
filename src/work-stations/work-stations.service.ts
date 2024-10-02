import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateWorkStationDto } from './dto/create-work-station.dto';
import { UpdateWorkStationDto } from './dto/update-work-station.dto';
import { WorkStationRepository } from './infrastructure/persistence/work-station.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { WorkStation } from './domain/work-station';
import { WorkStationReservationsService } from 'src/work-station-reservations/work-station-reservations.service';

@Injectable()
export class WorkStationsService {
  constructor(
    private readonly workStationRepository: WorkStationRepository,

    private readonly workStationReservationService: WorkStationReservationsService,
  ) {}

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

  async update(
    id: WorkStation['id'],
    updateWorkStationDto: UpdateWorkStationDto,
  ) {
    if (updateWorkStationDto.activate === false) {
      const hasReservations =
        await this.workStationReservationService.findOne(id);

      if (hasReservations) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            activate: 'Cannot deactivate garage with active reservations',
          },
        });
      }
    }
    return this.workStationRepository.update(id, updateWorkStationDto);
  }

  remove(id: WorkStation['id']) {
    return this.workStationRepository.remove(id);
  }
}
