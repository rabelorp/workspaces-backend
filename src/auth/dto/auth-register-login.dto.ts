import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'robson.rabelo@rabelodigital.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Robson' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Rabelo' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  position?: string;
}
