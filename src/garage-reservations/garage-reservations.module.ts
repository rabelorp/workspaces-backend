import { Module } from '@nestjs/common';
import { GarageReservationsService } from './garage-reservations.service';
import { GarageReservationsController } from './garage-reservations.controller';
import { RelationalGarageReservationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalGarageReservationPersistenceModule],
  controllers: [GarageReservationsController],
  providers: [GarageReservationsService],
  exports: [
    GarageReservationsService,
    RelationalGarageReservationPersistenceModule,
  ],
})
export class GarageReservationsModule {}
