import { forwardRef, Module } from '@nestjs/common';
import { WorkStationsService } from './work-stations.service';
import { WorkStationsController } from './work-stations.controller';
import { RelationalWorkStationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { WorkStationReservationsModule } from 'src/work-station-reservations/work-station-reservations.module';

@Module({
  imports: [
    RelationalWorkStationPersistenceModule,
    forwardRef(() => WorkStationReservationsModule),
  ],
  controllers: [WorkStationsController],
  providers: [WorkStationsService],
  exports: [WorkStationsService, RelationalWorkStationPersistenceModule],
})
export class WorkStationsModule {}
