import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateGarageDto {
  @ApiProperty()
  @IsString()
  photoId: string;

  @ApiProperty()
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsString()
  garageName: string;

  @ApiProperty()
  @IsNumber()
  capacity: number;
}
