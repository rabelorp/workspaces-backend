import { IsNotEmpty, IsString, IsUUID, IsEnum } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../interfaces/reservations.enum';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { CreateWorkStationDto } from 'src/work-stations/dto/create-work-station.dto';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

export class CreateWorkStationReservationDto {
  @ApiProperty({
    description:
      'Esse parâmetro é uma chave estrangeira que referencia o `id` da tabela `LockerReservation`, indicando a reserva do armário.',
  })
  @IsUUID()
  lockerReservationId?: string;

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
  @IsString()
  observation: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

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
  @IsNotEmpty()
  reservationDate: Date;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  workstationId: string;

  workstation?: CreateWorkStationDto;

  location?: CreateLocationDto;
}
