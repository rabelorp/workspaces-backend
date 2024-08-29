import {
  // decorators here

  IsString,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  exclusive: string;

  @ApiProperty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsString()
  roomName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  photoId: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
