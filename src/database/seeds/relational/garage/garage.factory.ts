import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GarageEntity } from '../../../../garages/infrastructure/persistence/relational/entities/garage.entity';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { GarageType } from 'src/interfaces/garage-type.enum';
import { LocationType } from '@interfaces/location.enum';

@Injectable()
export class GarageFactory {
  constructor(
    @InjectRepository(GarageEntity)
    private repositoryGarage: Repository<GarageEntity>,
    @InjectRepository(LocationEntity)
    private repositoryLocation: Repository<LocationEntity>,
  ) {}

  getRandomGarageType(): GarageType {
    const garageTypes = Object.values(GarageType);
    return faker.helpers.arrayElement(garageTypes);
  }

  async createRandomGarage() {
    const location = await this.repositoryLocation.findOne({
      where: { locationType: LocationType.GARAGE },
    });

    return () => {
      return this.repositoryGarage.create({
        garageName: faker.company.name(),
        locationId: location?.id,
        capacity: faker.number.int({ min: 3, max: 10 }),
        photoId: faker.image.url(),
        garageType: this.getRandomGarageType(),
      });
    };
  }
}
