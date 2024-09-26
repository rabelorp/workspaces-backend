import { Module } from '@nestjs/common';
import { LockerReservationsService } from './locker-reservations.service';
import { LockerReservationsController } from './locker-reservations.controller';
import { RelationalLockerReservationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalLockerReservationPersistenceModule],
  controllers: [LockerReservationsController],
  providers: [LockerReservationsService],
  exports: [
    LockerReservationsService,
    RelationalLockerReservationPersistenceModule,
  ],
})
export class LockerReservationsModule {}
