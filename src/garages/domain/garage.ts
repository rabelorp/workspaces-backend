import { ApiProperty } from '@nestjs/swagger';

export class Garage {
  @ApiProperty()
  photoId: string;

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  garageName: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
