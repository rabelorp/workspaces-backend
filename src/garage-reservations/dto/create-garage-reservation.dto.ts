import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';
import { ReservationTime } from '../../interfaces/reservation-time.enum';

export class CreateGarageReservationDto {
  @ApiProperty()
  @IsString()
  @MaxLength(7, {
    message: 'A placa do veículo deve conter 7 caracteres, exemplo: BRA2E19!',
  })
  vehiclePlate: string;

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
  @IsUUID()
  @IsNotEmpty()
  garageId: string;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ required: false })
  @IsString()
  observation?: string;

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

  @ApiProperty()
  @IsString()
  reservationDate: Date;
}
