import {
  IsNumber,
  // decorators here
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateWorkStationDto {
  @ApiProperty()
  @IsString()
  photoId: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsString()
  stationName: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
