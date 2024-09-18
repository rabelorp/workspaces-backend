import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';

import { Additionals } from '../additionals.class';
import { Type } from 'class-transformer';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';

export class CreateRoomReservationDto {
  @ApiProperty({
    type: [Additionals],
    description: 'Os adicionais são: café, água entre outros',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Additionals)
  additionals?: Additionals[];

  @ApiProperty({
    default: ReservationEnum.PENDENT,
    description: `Os valores permitidos são: ${Object.entries(ReservationEnum)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, value]) => typeof value === 'number')
      .map(([key, value]) => `\`${value} = ${key}\``)
      .join(', ')}`,
    enum: ReservationEnum,
  })
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

  @ApiProperty({
    description: `Os valores permitidos são: ${Object.entries(ReservationTime)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, value]) => typeof value === 'number')
      .map(([key, value]) => `\`${value} = ${key}\``)
      .join(', ')}`,
    enum: ReservationTime,
  })
  @IsEnum(ReservationTime)
  reservationTime: ReservationTime;
}
