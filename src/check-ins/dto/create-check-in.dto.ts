import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckInDto {
  id?: string;

  @ApiProperty()
  @IsString()
  reservationId: string;

  // @ApiProperty()
  // @IsString()
  checkInDate: Date;
}
