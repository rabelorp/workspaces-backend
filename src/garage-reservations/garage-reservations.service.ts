import { Injectable } from '@nestjs/common';
import { CreateGarageReservationDto } from './dto/create-garage-reservation.dto';
import { UpdateGarageReservationDto } from './dto/update-garage-reservation.dto';
import { GarageReservationRepository } from './infrastructure/persistence/garage-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { GarageReservation } from './domain/garage-reservation';

@Injectable()
export class GarageReservationsService {
  constructor(
    private readonly garageReservationRepository: GarageReservationRepository,
  ) {}

  create(createGarageReservationDto: CreateGarageReservationDto) {
    return this.garageReservationRepository.create(createGarageReservationDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.garageReservationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        filters: paginationOptions.filters,
      },
    });
  }

  findOne(id: GarageReservation['id']) {
    return this.garageReservationRepository.findById(id);
  }

  update(
    id: GarageReservation['id'],
    updateGarageReservationDto: UpdateGarageReservationDto,
  ) {
    return this.garageReservationRepository.update(
      id,
      updateGarageReservationDto,
    );
  }

  remove(id: GarageReservation['id']) {
    return this.garageReservationRepository.remove(id);
  }
}
