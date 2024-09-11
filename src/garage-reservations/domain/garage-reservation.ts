import { ApiProperty } from '@nestjs/swagger';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { ReservationEnum } from 'src/interfaces/reservations.enum';

export class GarageReservation {
  @ApiProperty()
  reservationStatus: ReservationEnum;

  @ApiProperty()
  garageId: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  observation?: string;

  @ApiProperty()
  reservationTime: ReservationTime;

  @ApiProperty()
  reservationDate: Date;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
