import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkStationDto {
  @ApiProperty()
  @IsString()
  photoId: string;

  @ApiProperty()
  @IsString()
  locationId: string;

  @ApiProperty({
    description:
      'Capacidade máxima de pessoas na estação de trabalho(workStations)',
    example: 1,
  })
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsString()
  stationName: string;
}
