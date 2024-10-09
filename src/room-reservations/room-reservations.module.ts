import { forwardRef, Module } from '@nestjs/common';
import { RoomReservationsService } from './room-reservations.service';
import { RoomReservationsController } from './room-reservations.controller';
import { RelationalRoomReservationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { RoomsModule } from '../rooms/rooms.module';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  imports: [
    RelationalRoomReservationPersistenceModule,
    MailModule,
    UsersModule,
    forwardRef(() => RoomsModule),
    LocationsModule,
  ],
  controllers: [RoomReservationsController],
  providers: [RoomReservationsService],
  exports: [
    RoomReservationsService,
    RelationalRoomReservationPersistenceModule,
  ],
})
export class RoomReservationsModule {}
