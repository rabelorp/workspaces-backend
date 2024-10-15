import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { CreateWorkStationDto } from 'src/work-stations/dto/create-work-station.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';
import { CreateCheckInDto } from 'src/check-ins/dto/create-check-in.dto';

export class WorkStationReservation {
  @ApiProperty()
  lockerReservationId?: string;

  @ApiProperty()
  checkInId?: string;

  @ApiProperty()
  reservationStatus: ReservationEnum;

  @ApiProperty()
  observation: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  reservationTime: ReservationTime;

  @ApiProperty()
  reservationDate: Date;

  @ApiProperty()
  workstationId: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  workstation?: CreateWorkStationDto;

  location?: CreateLocationDto;

  lockerReservation?: CreateLockerReservationDto;

  checkIn?: CreateCheckInDto;
}
