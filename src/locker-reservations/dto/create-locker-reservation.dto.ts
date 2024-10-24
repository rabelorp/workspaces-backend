import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '@interfaces/reservations.enum';
import { ReservationTime } from '@interfaces/reservation-time.enum';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { CreateLockerDto } from 'src/lockers/dto/create-locker.dto';
import { CreateCheckInDto } from 'src/check-ins/dto/create-check-in.dto';

export class CreateLockerReservationDto {
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reservationDate: Date;

  @ApiProperty({ required: false })
  @IsString()
  observation?: string;

  @IsOptional()
  @IsString()
  checkInId?: string;

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

  locker?: CreateLockerDto;

  location?: CreateLocationDto;

  checkIn?: CreateCheckInDto;
}
