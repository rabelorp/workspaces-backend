import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkStationDto {
  @ApiProperty()
  @IsString()
  photoId: string;

  @ApiProperty({
    description:
      'Esse parâmetro é uma chave estrangeira que referencia o `id` da tabela `Location`, indicando a localização da garagem.',
  })
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
