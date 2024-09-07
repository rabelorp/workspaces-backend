import { ApiProperty } from '@nestjs/swagger';

export class WorkStation {
  @ApiProperty()
  photoId?: string;

  @ApiProperty()
  locationId: string;

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
