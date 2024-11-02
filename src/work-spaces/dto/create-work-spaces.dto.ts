import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
export class CreateWorkSpacesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  activate: boolean;

  @ApiProperty()
  type: 'garage' | 'locker' | 'room' | 'workStation';
}
