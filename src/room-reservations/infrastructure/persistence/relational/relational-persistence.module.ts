import { Module } from '@nestjs/common';
import { RoomReservationRepository } from '../room-reservation.repository';
import { RoomReservationRelationalRepository } from './repositories/room-reservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomReservationEntity } from './entities/room-reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomReservationEntity])],
  providers: [
    {
      provide: RoomReservationRepository,
      useClass: RoomReservationRelationalRepository,
    },
  ],
  exports: [RoomReservationRepository],
})
export class RelationalRoomReservationPersistenceModule {}
