import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerReservationEntity } from '../../../../locker-reservations/infrastructure/persistence/relational/entities/locker-reservation.entity';
import { LockerReservationSeedService } from './locker-reservation-seed.service';
import { LockerEntity } from 'src/lockers/infrastructure/persistence/relational/entities/locker.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { NotificationSeedModule } from '../notification/notification-seed.module';
import { LockerReservationFactory } from '../locker-reservation/locker-reservation.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LockerReservationEntity,
      UserEntity,
      LockerEntity,
    ]),
    NotificationSeedModule,
  ],
  providers: [LockerReservationSeedService, LockerReservationFactory],
  exports: [LockerReservationSeedService, LockerReservationFactory],
})
export class LockerReservationSeedModule {}
