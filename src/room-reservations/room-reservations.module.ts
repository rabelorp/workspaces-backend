import { Module } from '@nestjs/common';
import { RoomReservationsService } from './room-reservations.service';
import { RoomReservationsController } from './room-reservations.controller';
import { RelationalRoomReservationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalRoomReservationPersistenceModule],
  controllers: [RoomReservationsController],
  providers: [RoomReservationsService],
  exports: [
    RoomReservationsService,
    RelationalRoomReservationPersistenceModule,
  ],
})
export class RoomReservationsModule {}
