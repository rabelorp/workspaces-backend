import { ApiProperty } from '@nestjs/swagger';
import { LocationCategory, LocationType } from 'src/interfaces/location.enum';

export class Location {
  @ApiProperty()
  locationCategory: LocationCategory;

  @ApiProperty()
  description?: string;

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

  @ApiProperty()
  deletedAt: Date;
}
