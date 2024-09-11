import { IsEnum, IsString, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
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
}
