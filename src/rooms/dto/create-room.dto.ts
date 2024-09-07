import { IsString, IsNumber, IsEnum } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ExclusiveRoomType } from 'src/interfaces/exclusive-room.enum';

export class CreateRoomDto {
  @ApiProperty({ enum: ExclusiveRoomType })
  @IsEnum(ExclusiveRoomType)
  exclusive: ExclusiveRoomType;

  @ApiProperty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsString()
  roomName: string;

  @ApiProperty()
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsString()
  photoId: string;
}
