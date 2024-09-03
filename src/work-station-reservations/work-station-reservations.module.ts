import { Module } from '@nestjs/common';
import { WorkStationReservationsService } from './work-station-reservations.service';
import { WorkStationReservationsController } from './work-station-reservations.controller';
import { RelationalWorkStationReservationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { WorkStationsModule } from 'src/work-stations/work-stations.module';

@Module({
  imports: [
    RelationalWorkStationReservationPersistenceModule,
    MailModule,
    UsersModule,
    WorkStationsModule,
  ],
  controllers: [WorkStationReservationsController],
  providers: [WorkStationReservationsService],
  exports: [
    WorkStationReservationsService,
    RelationalWorkStationReservationPersistenceModule,
  ],
})
export class WorkStationReservationsModule {}
