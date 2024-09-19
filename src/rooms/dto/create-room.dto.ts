import { IsString, IsNumber, IsEnum } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ExclusiveRoomType } from 'src/interfaces/exclusive-room.enum';

export class CreateRoomDto {
  @ApiProperty({ enum: ExclusiveRoomType })
  @IsEnum(ExclusiveRoomType)
  exclusive: ExclusiveRoomType;

  @ApiProperty({
    description: 'Capacidade máxima de pessoas na sala de reunião(rooms)',
    example: 1,
  })
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsString()
  roomName: string;

  @ApiProperty({
    description:
      'Esse parâmetro é uma chave estrangeira que referencia o `id` da tabela `Location`, indicando a localização da sala.',
  })
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsString()
  photoId: string;
}
