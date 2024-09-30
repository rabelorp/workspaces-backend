import { ApiProperty } from '@nestjs/swagger';
import { CreateGarageDto } from 'src/garages/dto/create-garage.dto';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { ReservationEnum } from 'src/interfaces/reservations.enum';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

export class GarageReservation {
  @ApiProperty()
  lockerReservationId?: string;

  @ApiProperty()
  vehiclePlate: string;

  @ApiProperty()
  reservationStatus: ReservationEnum;

  @ApiProperty()
  garageId: string;

  @ApiProperty()
  userId: string;

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

  garage?: CreateGarageDto;

  location?: CreateLocationDto;
}
