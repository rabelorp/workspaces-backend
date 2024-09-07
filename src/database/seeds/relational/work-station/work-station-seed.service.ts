import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkStationEntity } from '../../../../work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { WorkStationFactory } from './work-station.factory';

@Injectable()
export class WorkStationSeedService {
  constructor(
    @InjectRepository(WorkStationEntity)
    private repository: Repository<WorkStationEntity>,
    private workStationFactory: WorkStationFactory,
  ) {}

  async run() {
    await this.repository.save(
      faker.helpers.multiple(
        await this.workStationFactory.createRandomWorkStation(),
        {
          count: 5,
        },
      ),
    );
  }
}
