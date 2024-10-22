import { Module } from '@nestjs/common';
import { LockerReservationRepository } from '../locker-reservation.abstract';
import { LockerReservationRelationalRepository } from './repositories/locker-reservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerReservationEntity } from './entities/locker-reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LockerReservationEntity])],
  providers: [
    {
      provide: LockerReservationRepository,
      useClass: LockerReservationRelationalRepository,
    },
  ],
  exports: [LockerReservationRepository],
})
export class RelationalLockerReservationPersistenceModule {}
