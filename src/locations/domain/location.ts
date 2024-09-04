import { ApiProperty } from '@nestjs/swagger';
import { LocationType } from 'src/interfaces/location.enum';

export class Location {
  @ApiProperty()
  description: string;

  @ApiProperty()
  capacity?: number;

  @ApiProperty()
  locationType: LocationType;

  @ApiProperty()
  locationName: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
