import {
  // decorators here

  IsNumber,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateRoomReservationDto {
  @ApiProperty()
  @IsString()
  observation: string;

  @ApiProperty()
  @IsString()
  roomId: string;

  @ApiProperty()
  @IsString()
  reservationDate: Date;

  @ApiProperty()
  @IsString()
  reservationTime: string;

  @ApiProperty()
  @IsNumber()
  userId: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
