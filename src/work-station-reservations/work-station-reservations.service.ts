import { Injectable } from '@nestjs/common';
import { CreateWorkStationReservationDto } from './dto/create-work-station-reservation.dto';
import { UpdateWorkStationReservationDto } from './dto/update-work-station-reservation.dto';
import { WorkStationReservationRepository } from './infrastructure/persistence/work-station-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { WorkStationReservation } from './domain/work-station-reservation';

@Injectable()
export class WorkStationReservationsService {
  constructor(
    private readonly workStationReservationRepository: WorkStationReservationRepository,
  ) {}

  create(createWorkStationReservationDto: CreateWorkStationReservationDto) {
    return this.workStationReservationRepository.create(
      createWorkStationReservationDto,
    );
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.workStationReservationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: WorkStationReservation['id']) {
    return this.workStationReservationRepository.findById(id);
  }

  update(
    id: WorkStationReservation['id'],
    updateWorkStationReservationDto: UpdateWorkStationReservationDto,
  ) {
    return this.workStationReservationRepository.update(
      id,
      updateWorkStationReservationDto,
    );
  }

  remove(id: WorkStationReservation['id']) {
    return this.workStationReservationRepository.remove(id);
  }
}
