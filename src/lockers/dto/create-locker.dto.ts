import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateLockerDto {
  @ApiProperty()
  @IsString()
  lockerName: string;

  @ApiProperty()
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsString()
  photoId: string;
}
