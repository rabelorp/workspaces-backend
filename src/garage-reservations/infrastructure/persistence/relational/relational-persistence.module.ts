import { Module } from '@nestjs/common';
import { GarageReservationRepository } from '../garage-reservation.abstract';
import { GarageReservationRelationalRepository } from './repositories/garage-reservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarageReservationEntity } from './entities/garage-reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GarageReservationEntity])],
  providers: [
    {
      provide: GarageReservationRepository,
      useClass: GarageReservationRelationalRepository,
    },
  ],
  exports: [GarageReservationRepository],
})
export class RelationalGarageReservationPersistenceModule {}
