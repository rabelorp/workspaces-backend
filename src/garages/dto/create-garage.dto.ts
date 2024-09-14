import { IsEnum, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { GarageType } from 'src/interfaces/garage-type.enum';

export class CreateGarageDto {
  @ApiProperty({ enum: GarageType })
  @IsEnum(GarageType)
  garageType: GarageType;

  @ApiProperty()
  @IsString()
  photoId: string;

  @ApiProperty()
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsString()
  garageName: string;

  @ApiProperty({
    description: 'Capacidade máxima de veículos na garagem(garages) ',
    example: 1,
  })
  @IsNumber()
  capacity: number;
}
