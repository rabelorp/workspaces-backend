import { forwardRef, Module } from '@nestjs/common';
import { GarageReservationsService } from './garage-reservations.service';
import { GarageReservationsController } from './garage-reservations.controller';
import { RelationalGarageReservationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { LocationsModule } from 'src/locations/locations.module';
import { MailModule } from 'src/mail/mail.module';

import { UsersModule } from 'src/users/users.module';
import { GaragesModule } from 'src/garages/garages.module';

@Module({
  imports: [
    RelationalGarageReservationPersistenceModule,
    MailModule,
    UsersModule,
    forwardRef(() => GaragesModule),
    LocationsModule,
  ],
  controllers: [GarageReservationsController],
  providers: [GarageReservationsService],
  exports: [
    GarageReservationsService,
    RelationalGarageReservationPersistenceModule,
  ],
})
export class GarageReservationsModule {}
