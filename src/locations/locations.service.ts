import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepository } from './infrastructure/persistence/location.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Location } from './domain/location';

@Injectable()
export class LocationsService {
  constructor(private readonly locationRepository: LocationRepository) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.create(createLocationDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.locationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Location['id']) {
    return this.locationRepository.findById(id);
  }

  update(id: Location['id'], updateLocationDto: UpdateLocationDto) {
    return this.locationRepository.update(id, updateLocationDto);
  }

  remove(id: Location['id']) {
    return this.locationRepository.remove(id);
  }
}
