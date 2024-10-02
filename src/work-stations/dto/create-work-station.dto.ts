import { IsNumber, IsString, IsBoolean, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkStationDto {
  @ApiProperty({
    description:
      'Esse parâmetro ativa/inativa a estação de trabalho(workStations).',
    example: true,
  })
  @IsBoolean()
  activate: boolean;

  id?: string;

  @ApiProperty()
  @IsString()
  photoId: string;

  @ApiProperty({
    description:
      'Esse parâmetro é uma chave estrangeira que referencia o `id` da tabela `Location`, indicando a localização da estação de trabalho(workStations).',
  })
  @IsUUID()
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
