import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';
import { ReservationTime } from '../../interfaces/reservation-time.enum';

export class CreateGarageReservationDto {
  @ApiProperty({ default: ReservationEnum.pendent })
  @IsEnum(ReservationEnum)
  reservationStatus: ReservationEnum;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  garageId: string;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ required: false })
  @IsString()
  observation?: string;

  @ApiProperty({ enum: ReservationTime })
  @IsEnum(ReservationTime)
  reservationTime: ReservationTime;

  @ApiProperty()
  @IsString()
  reservationDate: Date;
}
