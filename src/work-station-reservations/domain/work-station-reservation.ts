import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { CreateWorkStationDto } from 'src/work-stations/dto/create-work-station.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

export class WorkStationReservation {
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
}
