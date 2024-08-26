import {
  IsNotEmpty,
  // decorators here
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateWorkStationReservationDto {
  @ApiProperty()
  @IsString()
  observation: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reservationTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reservationDate: Date;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  workstationId: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
