import { forwardRef, Module } from '@nestjs/common';
import { WorkStationReservationsService } from './work-station-reservations.service';
import { WorkStationReservationsController } from './work-station-reservations.controller';
import { RelationalWorkStationReservationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { WorkStationsModule } from 'src/work-stations/work-stations.module';
import { LocationsModule } from 'src/locations/locations.module';
import { LockerReservationsModule } from 'src/locker-reservations/locker-reservations.module';

@Module({
  imports: [
    RelationalWorkStationReservationPersistenceModule,
    MailModule,
    UsersModule,
    forwardRef(() => WorkStationsModule),
    LocationsModule,
    forwardRef(() => LockerReservationsModule),
  ],
  controllers: [WorkStationReservationsController],
  providers: [WorkStationReservationsService],
  exports: [
    WorkStationReservationsService,
    RelationalWorkStationReservationPersistenceModule,
  ],
})
export class WorkStationReservationsModule {}
