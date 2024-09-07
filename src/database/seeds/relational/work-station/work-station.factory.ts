import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkStationEntity } from '../../../../work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';

@Injectable()
export class WorkStationFactory {
  constructor(
    @InjectRepository(WorkStationEntity)
    private repositoryWorkStation: Repository<WorkStationEntity>,
    @InjectRepository(LocationEntity)
    private repositoryLocation: Repository<LocationEntity>,
  ) {}

  async createRandomWorkStation() {
    const location = await this.repositoryLocation.findOne({ where: {} });
    return () => {
      return this.repositoryWorkStation.create({
        stationName: faker.company.name(),
        locationId: location?.id,
        capacity: faker.number.int({ min: 3, max: 10 }),
        photoId: faker.image.url(),
      });
    };
  }
}
