import { IsEnum, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { LocationCategory, LocationType } from 'src/interfaces/location.enum';

export class CreateLocationDto {
  id?: string;

  @ApiProperty({ enum: LocationCategory })
  @IsEnum(LocationCategory)
  locationCategory: LocationCategory;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty({ enum: LocationType })
  @IsEnum(LocationType)
  locationType: LocationType;

  @ApiProperty()
  @IsString()
  locationName: string;
}
