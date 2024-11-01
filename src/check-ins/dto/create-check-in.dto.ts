import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckInDto {
  @ApiProperty()
  @IsString()
  lockerReservationId?: string;

  id?: string;

  @ApiProperty()
  @IsString()
  reservationId: string;

  // @ApiProperty()
  // @IsString()
  checkInDate: Date;
}
