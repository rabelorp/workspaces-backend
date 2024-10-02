import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';
import { GarageRepository } from './infrastructure/persistence/garage.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Garage } from './domain/garage';
import { GarageReservationsService } from 'src/garage-reservations/garage-reservations.service';

@Injectable()
export class GaragesService {
  constructor(
    private readonly garageRepository: GarageRepository,
    private readonly garageReservationService: GarageReservationsService,
  ) {}

  create(createGarageDto: CreateGarageDto) {
    return this.garageRepository.create(createGarageDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.garageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        filters: paginationOptions.filters,
      },
    });
  }

  findOne(id: Garage['id']) {
    return this.garageRepository.findById(id);
  }

  async update(id: Garage['id'], updateGarageDto: UpdateGarageDto) {
    if (updateGarageDto.activate === false) {
      const hasReservations = await this.garageReservationService.findOne(id);

      if (hasReservations) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            activate: 'Cannot deactivate garage with active reservations',
          },
        });
      }
    }
    return this.garageRepository.update(id, updateGarageDto);
  }

  remove(id: Garage['id']) {
    return this.garageRepository.remove(id);
  }
}
