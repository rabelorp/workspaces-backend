import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkStationReservationEntity } from '../../../../work-station-reservations/infrastructure/persistence/relational/entities/work-station-reservation.entity';
import { WorkStationReservationSeedService } from './work-station-reservation-seed.service';
import { WorkStationReservationFactory } from './work-station-reservation.factory';
import { WorkStationSeedModule } from '../work-station/work-station-seed.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkStationReservationEntity]),
    WorkStationSeedModule,
  ],
  providers: [WorkStationReservationFactory, WorkStationReservationSeedService],
  exports: [WorkStationReservationFactory, WorkStationReservationSeedService],
})
export class WorkStationReservationSeedModule {}
