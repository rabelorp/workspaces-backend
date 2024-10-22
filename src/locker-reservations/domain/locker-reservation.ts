import { ReservationTime } from '@interfaces/reservation-time.enum';
import { ReservationEnum } from '@interfaces/reservations.enum';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCheckInDto } from 'src/check-ins/dto/create-check-in.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerDto } from 'src/lockers/dto/create-locker.dto';

export class LockerReservation {
  @ApiProperty()
  reservationDate: Date;

  @ApiProperty()
  observation?: string;

  @ApiProperty()
  reservationTime: ReservationTime;

  @ApiProperty()
  userId: string;

  checkInId?: string;

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

  locker?: CreateLockerDto;

  location?: CreateLocationDto;

  checkIn?: CreateCheckInDto;
}
