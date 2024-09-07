import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkStationDto {
  @ApiProperty()
  @IsString()
  photoId: string;

  @ApiProperty()
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsString()
  stationName: string;
}
