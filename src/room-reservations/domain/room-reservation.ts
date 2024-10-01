import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';
import { Additionals } from '../additionals.class';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';

export class RoomReservation {
  @ApiProperty()
  lockerReservationId?: string;

  @ApiProperty()
  additionals?: Additionals[];

  @ApiProperty()
  reservationStatus: ReservationEnum;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  observation: string;

  @ApiProperty()
  roomId: string;

  @ApiProperty()
  reservationDate: Date;

  @ApiProperty()
  reservationTime: ReservationTime;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  room?: CreateRoomDto;

  location?: CreateLocationDto;

  lockerReservation?: CreateLockerReservationDto;
}
