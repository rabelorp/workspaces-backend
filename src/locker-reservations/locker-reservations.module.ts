import { forwardRef, Module } from '@nestjs/common';
import { LockerReservationsService } from './locker-reservations.service';
import { LockerReservationsController } from './locker-reservations.controller';
import { RelationalLockerReservationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { MailModule } from '@mail/mail.module';
import { LockersModule } from 'src/lockers/lockers.module';
import { LocationsModule } from 'src/locations/locations.module';
import { UsersModule } from 'src/users/users.module';
import { RoomReservationsModule } from 'src/room-reservations/room-reservations.module';

@Module({
  imports: [
    RelationalLockerReservationPersistenceModule,
    MailModule,
    UsersModule,
    forwardRef(() => LockersModule),
    LocationsModule,
    forwardRef(() => RoomReservationsModule),
  ],
  controllers: [LockerReservationsController],
  providers: [LockerReservationsService],
  exports: [
    LockerReservationsService,
    RelationalLockerReservationPersistenceModule,
  ],
})
export class LockerReservationsModule {}
