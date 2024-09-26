import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '@interfaces/reservations.enum';
import { ReservationTime } from '@interfaces/reservation-time.enum';
import { CreateGarageDto } from 'src/garages/dto/create-garage.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

export class CreateLockerReservationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reservationDate: Date;

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
  @IsUUID()
  @IsNotEmpty()
  lockerId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

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

  garage?: CreateGarageDto;

  location?: CreateLocationDto;
}
