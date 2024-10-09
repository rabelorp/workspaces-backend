import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from '../../../../locations/infrastructure/persistence/relational/entities/location.entity';
import {
  LocationCategory,
  LocationType,
} from '../../../../interfaces/location.enum';

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
  getRandomLocationCategory(): LocationCategory {
    const locationCategory = Object.values(LocationCategory);
    return faker.helpers.arrayElement(locationCategory);
  }

  createRandomLocation() {
    const locationTypes = Object.values(LocationType);
    return locationTypes.map((locationType) => {
      return this.repositoryLocation.create({
        locationName: faker.person.firstName(),
        locationType: locationType,
        description: faker.lorem.words(5),
        locationCategory: this.getRandomLocationCategory(),
      });
    });
  }
}
