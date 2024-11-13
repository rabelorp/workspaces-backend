import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { AuthRabelodigitalService } from './auth-rabelodigital.service';
import { AuthRabelodigitalLoginDto } from './dto/auth-rabelodigital-login.dto';
import { LoginResponseDto } from '../auth/dto/login-response.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth/rabelodigital',
  version: '1',
})
export class AuthRabelodigitalController {
  constructor(
    private readonly authService: AuthService,
    private readonly authRabelodigitalService: AuthRabelodigitalService,
  ) {}

  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: AuthRabelodigitalLoginDto,
  ): Promise<LoginResponseDto> {
    try {
      const socialData =
        await this.authRabelodigitalService.getProfile(loginDto);
      return this.authService.validateSocialLogin('rabelodigital', socialData);
    } catch (error) {
      console.log({error, request: error?.request, response: error?.response})
      if (error.response && error.response.status === 401) {
        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'Failed to fetch profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
