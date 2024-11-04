import { IsOptional, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckInDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  lockerReservationId?: string;

  id?: string;

  @ApiProperty()
  @IsUUID()
  reservationId: string;

  // @ApiProperty()
  // @IsString()
  checkInDate: Date;
}
