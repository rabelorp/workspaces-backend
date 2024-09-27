import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LockerEntity } from '../../../../lockers/infrastructure/persistence/relational/entities/locker.entity';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { LocationType } from '@interfaces/location.enum';

@Injectable()
export class LockerFactory {
  constructor(
    @InjectRepository(LockerEntity)
    private repositoryLocker: Repository<LockerEntity>,
    @InjectRepository(LocationEntity)
    private repositoryLocation: Repository<LocationEntity>,
  ) {}

  async createRandomLocker() {
    const location = await this.repositoryLocation.findOne({
      where: { locationType: LocationType.LOCKER },
    });

    return () => {
      return this.repositoryLocker.create({
        lockerName: faker.company.name(),
        locationId: location?.id,
        photoId: faker.image.url(),
      });
    };
  }
}
