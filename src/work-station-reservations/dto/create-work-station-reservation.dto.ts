import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  IsEnum,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';

export class CreateWorkStationReservationDto {
  @ApiProperty({ default: ReservationEnum.pendent })
  @IsEnum(ReservationEnum)
  reservationStatus: ReservationEnum;

  @ApiProperty()
  @IsString()
  observation: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'matutino' })
  @IsString()
  @IsNotEmpty()
  reservationTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reservationDate: Date;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  workstationId: string;

  @ApiProperty()
  locationId: string;
}
