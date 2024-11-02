import { ApiProperty } from '@nestjs/swagger';

export class WorkSpaces {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  activate: boolean;

  @ApiProperty()
  type: 'garage' | 'locker' | 'room' | 'workStation';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
