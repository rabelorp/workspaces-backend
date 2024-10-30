import { ApiProperty } from '@nestjs/swagger';
import { CreateCheckInDto } from 'src/check-ins/dto/create-check-in.dto';
import { CreateGarageDto } from 'src/garages/dto/create-garage.dto';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { ReservationEnum } from 'src/interfaces/reservations.enum';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class GarageReservation {
  @ApiProperty()
  lockerReservationId?: string;

  @ApiProperty()
  checkInId?: string;

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

  @ApiProperty()
  deletedAt: Date;

  garage?: CreateGarageDto;

  location?: CreateLocationDto;

  lockerReservation?: CreateLockerReservationDto;

  checkIn?: CreateCheckInDto;

  user?: CreateUserDto;
}
