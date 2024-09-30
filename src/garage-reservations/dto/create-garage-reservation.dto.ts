import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';
import { ReservationTime } from '../../interfaces/reservation-time.enum';
import { CreateGarageDto } from 'src/garages/dto/create-garage.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

export class CreateGarageReservationDto {
  @ApiProperty({
    description:
      'Esse parâmetro é uma chave estrangeira que referencia o `id` da tabela `LockerReservation`, indicando a reserva do armário.',
  })
  @IsUUID()
  lockerReservationId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
  @IsUUID()
  @IsNotEmpty()
  userId: string;

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
  @IsNotEmpty()
  reservationTime: ReservationTime;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reservationDate: Date;

  garage?: CreateGarageDto;

  location?: CreateLocationDto;
}
