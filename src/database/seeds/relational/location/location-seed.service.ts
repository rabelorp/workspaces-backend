import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../../../../locations/infrastructure/persistence/relational/entities/location.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { LocationFactory } from './location.factory';

@Injectable()
export class LocationSeedService {
  constructor(
    @InjectRepository(LocationEntity)
    private repository: Repository<LocationEntity>,
    private locationFactory: LocationFactory,
  ) {}

  async run() {
    await this.repository.save(
      faker.helpers.multiple(this.locationFactory.createRandomLocation(), {
        count: 5,
      }),
    );
  }
}
