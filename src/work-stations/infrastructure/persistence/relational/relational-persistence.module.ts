import { Module } from '@nestjs/common';
import { WorkStationRepository } from '../work-station.repository';
import { WorkStationRelationalRepository } from './repositories/work-station.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkStationEntity } from './entities/work-station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkStationEntity])],
  providers: [
    {
      provide: WorkStationRepository,
      useClass: WorkStationRelationalRepository,
    },
  ],
  exports: [WorkStationRepository],
})
export class RelationalWorkStationPersistenceModule {}
