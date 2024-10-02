import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';

import { Additionals } from '../additionals.class';
import { Type } from 'class-transformer';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';

export class CreateRoomReservationDto {
  @ApiProperty({
    description:
      'Esse parâmetro é uma chave estrangeira que referencia o `id` da tabela `LockerReservation`, indicando a reserva do armário.',
  })
  @IsOptional()
  @IsUUID()
  lockerReservationId?: string;

  id?: string;

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
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  observation: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  reservationTime: ReservationTime;

  room?: CreateRoomDto;

  location?: CreateLocationDto;

  lockerReservation?: CreateLockerReservationDto;
}
