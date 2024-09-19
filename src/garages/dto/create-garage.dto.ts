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

  @ApiProperty({
    description:
      'Esse parâmetro é uma chave estrangeira que referencia o `id` da tabela `Location`, indicando a localização da garagem.',
  })
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsString()
  garageName: string;

  @ApiProperty({
    description: 'Capacidade máxima de veículos',
    example: 1,
  })
  @IsNumber()
  capacity: number;
}
