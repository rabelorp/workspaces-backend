import { IsString, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateLockerDto {
  id?: string;

  @ApiProperty()
  @IsString()
  lockerName: string;

  @ApiProperty({
    description:
      'Esse parâmetro é uma chave estrangeira que referencia o `id` da tabela `Location`, indicando a localização do armário.',
  })
  @IsUUID()
  locationId: string;

  @ApiProperty()
  @IsString()
  photoId: string;
}
