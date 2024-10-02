import { forwardRef, Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RelationalRoomPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RoomReservationsModule } from 'src/room-reservations/room-reservations.module';

@Module({
  imports: [
    RelationalRoomPersistenceModule,
    forwardRef(() => RoomReservationsModule),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService, RelationalRoomPersistenceModule],
})
export class RoomsModule {}
