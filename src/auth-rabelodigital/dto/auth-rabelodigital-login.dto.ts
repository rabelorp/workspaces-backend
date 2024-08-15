import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthRabelodigitalLoginDto {
  @ApiProperty({ example: 'robson.rabelo@rabelodigital.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  password: string;
}
