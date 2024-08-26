import { Module } from '@nestjs/common';
import { WorkStationReservationsService } from './work-station-reservations.service';
import { WorkStationReservationsController } from './work-station-reservations.controller';
import { RelationalWorkStationReservationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalWorkStationReservationPersistenceModule],
  controllers: [WorkStationReservationsController],
  providers: [WorkStationReservationsService],
  exports: [
    WorkStationReservationsService,
    RelationalWorkStationReservationPersistenceModule,
  ],
})
export class WorkStationReservationsModule {}
