import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';

export class CreateRoomReservationDto {
  @ApiProperty({ default: ReservationEnum.pendent })
  @IsEnum(ReservationEnum)
  reservationStatus: ReservationEnum;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  observation: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty()
  @IsString()
  reservationDate: Date;

  @ApiProperty({ example: 'matutino' })
  @IsString()
  reservationTime: string;
}
