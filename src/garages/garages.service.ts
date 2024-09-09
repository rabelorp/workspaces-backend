import { Injectable } from '@nestjs/common';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';
import { GarageRepository } from './infrastructure/persistence/garage.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Garage } from './domain/garage';

@Injectable()
export class GaragesService {
  constructor(private readonly garageRepository: GarageRepository) {}

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
      },
    });
  }

  findOne(id: Garage['id']) {
    return this.garageRepository.findById(id);
  }

  update(id: Garage['id'], updateGarageDto: UpdateGarageDto) {
    return this.garageRepository.update(id, updateGarageDto);
  }

  remove(id: Garage['id']) {
    return this.garageRepository.remove(id);
  }
}
