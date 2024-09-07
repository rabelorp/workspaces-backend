import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkStationEntity } from '../../../../work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { WorkStationSeedService } from './work-station-seed.service';
import { WorkStationFactory } from './work-station.factory';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkStationEntity, LocationEntity])],
  providers: [WorkStationFactory, WorkStationSeedService],
  exports: [WorkStationFactory, WorkStationSeedService, TypeOrmModule],
})
export class WorkStationSeedModule {}
