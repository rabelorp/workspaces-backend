import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRabelodigitalLoginDto {
  @ApiProperty({ example: 'robson.rabelo@rabelodigital.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
