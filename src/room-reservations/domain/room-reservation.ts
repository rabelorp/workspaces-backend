import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';

export class RoomReservation {
  @ApiProperty()
  reservationStatus: ReservationEnum;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  observation: string;

  @ApiProperty()
  roomId: string;

  @ApiProperty()
  reservationDate: Date;

  @ApiProperty()
  reservationTime: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
