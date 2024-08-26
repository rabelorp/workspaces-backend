import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkStationEntity } from '../../../../work-stations/infrastructure/persistence/relational/entities/work-station.entity';

@Injectable()
export class WorkStationFactory {
  constructor(
    @InjectRepository(WorkStationEntity)
    private repositoryWorkStation: Repository<WorkStationEntity>,
  ) {}

  createRandomWorkStation() {
    // Need for saving "this" context
    return () => {
      return this.repositoryWorkStation.create({
        stationName: faker.company.name(),
        location: faker.location.city(),
        capacity: faker.number.int({ min: 3, max: 10 }),
      });
    };
  }
}
