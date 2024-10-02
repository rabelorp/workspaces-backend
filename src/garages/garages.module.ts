import { forwardRef, Module } from '@nestjs/common';
import { GaragesService } from './garages.service';
import { GaragesController } from './garages.controller';
import { RelationalGaragePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { GarageReservationsModule } from 'src/garage-reservations/garage-reservations.module';

@Module({
  imports: [
    RelationalGaragePersistenceModule,
    forwardRef(() => GarageReservationsModule),
  ],
  controllers: [GaragesController],
  providers: [GaragesService],
  exports: [GaragesService, RelationalGaragePersistenceModule],
})
export class GaragesModule {}
