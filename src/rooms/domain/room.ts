import { ApiProperty } from '@nestjs/swagger';
import { ExclusiveRoomType } from 'src/interfaces/exclusive-room.enum';

export class Room {
  @ApiProperty()
  activate: boolean;

  @ApiProperty()
  exclusive: ExclusiveRoomType;

  @ApiProperty()
  capacity?: number;

  @ApiProperty()
  roomName: string;

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  photoId: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
