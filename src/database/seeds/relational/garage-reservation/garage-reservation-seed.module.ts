import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarageReservationEntity } from '../../../../garage-reservations/infrastructure/persistence/relational/entities/garage-reservation.entity';
import { GarageReservationSeedService } from './garage-reservation-seed.service';
import { GarageReservationFactory } from './garage-reservation.factory';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { GarageEntity } from 'src/garages/infrastructure/persistence/relational/entities/garage.entity';
import { NotificationSeedModule } from '../notification/notification-seed.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GarageReservationEntity,
      UserEntity,
      GarageEntity,
    ]),
    NotificationSeedModule,
  ],
  providers: [GarageReservationSeedService, GarageReservationFactory],
  exports: [GarageReservationSeedService, GarageReservationFactory],
})
export class GarageReservationSeedModule {}
