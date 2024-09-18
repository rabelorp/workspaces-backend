import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class Additionals {
  @ApiProperty()
  @IsString()
  item: string;

  @ApiProperty()
  @IsInt()
  quantity: number;

  constructor(item: string, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }
}
