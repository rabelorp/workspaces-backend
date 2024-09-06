import { ApiProperty } from '@nestjs/swagger';

export class Room {
  @ApiProperty()
  exclusive: string;

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
}
