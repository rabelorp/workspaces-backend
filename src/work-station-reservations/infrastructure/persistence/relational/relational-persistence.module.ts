import { Module } from '@nestjs/common';
import { WorkStationReservationRepository } from '../work-station-reservation.repository';
import { WorkStationReservationRelationalRepository } from './repositories/work-station-reservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkStationReservationEntity } from './entities/work-station-reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkStationReservationEntity])],
  providers: [
    {
      provide: WorkStationReservationRepository,
      useClass: WorkStationReservationRelationalRepository,
    },
  ],
  exports: [WorkStationReservationRepository],
})
export class RelationalWorkStationReservationPersistenceModule {}
