import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { LocationType } from 'src/interfaces/location.enum';

@Injectable()
export class LocationFactory {
  constructor(
    @InjectRepository(LocationEntity)
    private repositoryLocation: Repository<LocationEntity>,
  ) {}

  getRandomLocationType(): LocationType {
    const locationTypes = Object.values(LocationType);
    return faker.helpers.arrayElement(locationTypes);
  }

  createRandomLocation() {
    return () => {
      return this.repositoryLocation.create({
        locationName: faker.company.name(),
        locationType: this.getRandomLocationType(),
        capacity: faker.number.int({ min: 3, max: 10 }),
        description: faker.lorem.word(5),
      });
    };
  }
}
