import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomReservationEntity } from '../../../../room-reservations/infrastructure/persistence/relational/entities/room-reservation.entity';
import { RoomReservationSeedService } from './room-reservation-seed.service';
import { RoomReservationFactory } from './room-reservation.factory';
import { RoomSeedModule } from '../room/room-seed.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomReservationEntity]), RoomSeedModule],
  providers: [RoomReservationSeedService, RoomReservationFactory],
  exports: [RoomReservationSeedService, RoomReservationFactory],
})
export class RoomReservationSeedModule {}
