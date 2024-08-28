import { ApiProperty } from '@nestjs/swagger';

export class WorkStation {
  @ApiProperty()
  photoId: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  stationName: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
