import {
  // decorators here

  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateGarageReservationDto {
  @ApiProperty()
  @IsString()
  reservationDate: Date;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
