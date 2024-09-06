import {
  IsEnum,
  // decorators here
  IsString,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { LocationType } from 'src/interfaces/location.enum';

export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  capacity?: number;

  @ApiProperty({ enum: LocationType })
  @IsEnum(LocationType)
  locationType: LocationType;

  @ApiProperty()
  @IsString()
  locationName: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
