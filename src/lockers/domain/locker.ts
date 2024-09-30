import { ApiProperty } from '@nestjs/swagger';

export class Locker {
  @ApiProperty()
  activate: boolean;

  @ApiProperty()
  lockerName: string;

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
