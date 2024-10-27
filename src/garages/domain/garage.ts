import { ApiProperty } from '@nestjs/swagger';
import { GarageType } from 'src/interfaces/garage-type.enum';

export class Garage {
  @ApiProperty()
  activate: boolean;

  @ApiProperty()
  garageType: GarageType;

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

  @ApiProperty()
  deletedAt: Date;
}
