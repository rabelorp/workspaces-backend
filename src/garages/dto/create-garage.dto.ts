import {
  // decorators here

  IsNumber,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateGarageDto {
  @ApiProperty()
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsString()
  garageName: string;

  @ApiProperty()
  @IsNumber()
  capacity: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
