import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GarageEntity } from '../../../../garages/infrastructure/persistence/relational/entities/garage.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { GarageFactory } from './garage.factory';

@Injectable()
export class GarageSeedService {
  constructor(
    @InjectRepository(GarageEntity)
    private garageRepository: Repository<GarageEntity>,
    private garageFactory: GarageFactory,
  ) {}

  async run() {
    await this.garageRepository.save(
      faker.helpers.multiple(await this.garageFactory.createRandomGarage(), {
        count: 5,
      }),
    );
  }
}
