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
  @IsNumber()
  userId: number;

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

  // Don't forget to use the class-validator decorators in the DTO properties.
}
