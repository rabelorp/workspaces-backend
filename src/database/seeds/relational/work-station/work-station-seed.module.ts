import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkStationEntity } from '../../../../work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { WorkStationSeedService } from './work-station-seed.service';
import { WorkStationFactory } from './work-station.factory';

@Module({
  imports: [TypeOrmModule.forFeature([WorkStationEntity])],
  providers: [WorkStationFactory, WorkStationSeedService],
  exports: [WorkStationFactory, WorkStationSeedService, TypeOrmModule],
})
export class WorkStationSeedModule {}
