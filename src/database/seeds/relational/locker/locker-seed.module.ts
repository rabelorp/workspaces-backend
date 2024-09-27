import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerEntity } from '../../../../lockers/infrastructure/persistence/relational/entities/locker.entity';
import { LockerSeedService } from './locker-seed.service';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { LockerFactory } from './locker.factory';

@Module({
  imports: [TypeOrmModule.forFeature([LockerEntity, LocationEntity])],
  providers: [LockerSeedService, LockerFactory],
  exports: [LockerSeedService, LockerFactory],
})
export class LockerSeedModule {}
