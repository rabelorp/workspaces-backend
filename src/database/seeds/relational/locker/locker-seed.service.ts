import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LockerEntity } from '../../../../lockers/infrastructure/persistence/relational/entities/locker.entity';
import { Repository } from 'typeorm';
import { LockerFactory } from './locker.factory';
import { faker } from '@faker-js/faker';

@Injectable()
export class LockerSeedService {
  constructor(
    @InjectRepository(LockerEntity)
    private lockerRepository: Repository<LockerEntity>,
    private lockerFactory: LockerFactory,
  ) {}

  async run() {
    await this.lockerRepository.save(
      faker.helpers.multiple(await this.lockerFactory.createRandomLocker(), {
        count: 5,
      }),
    );
  }
}
