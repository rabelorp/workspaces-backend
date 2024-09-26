import { ReservationTime } from '@interfaces/reservation-time.enum';
import { ReservationEnum } from '@interfaces/reservations.enum';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGarageDto } from 'src/garages/dto/create-garage.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

export class LockerReservation {
  @ApiProperty()
  reservationDate: Date;

  @ApiProperty()
  observation?: string;

  @ApiProperty()
  reservationTime: ReservationTime;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  reservationStatus: ReservationEnum;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  lockerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  garage?: CreateGarageDto;

  location?: CreateLocationDto;
}
