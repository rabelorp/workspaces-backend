import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AuthRabelodigitalLoginDto } from './dto/auth-rabelodigital-login.dto';
import { SocialInterface } from '../social/interfaces/social.interface';
import { lastValueFrom } from 'rxjs';
import { removeDomainFromEmail } from '../utils/email';

@Injectable()
export class AuthRabelodigitalService {
  constructor(private readonly httpService: HttpService) {}
  private async getTokenByExternalApi(
    loginDto: AuthRabelodigitalLoginDto,
  ): Promise<any> {
    console.log('rabeloooooooooooooooooooooooooooooooooo');
    console.log(process.env.API_PORTAL_RABELODIGITAL);
    const response = await lastValueFrom(
      this.httpService.post(
        `${process.env.API_PORTAL_RABELODIGITAL}/api/v1/auth`,
        {
          username: removeDomainFromEmail(loginDto.email),
          password: loginDto.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    const token = response.data.access;

    return token;
  }

  private async getProfileByToken(token: string): Promise<SocialInterface> {
    const response = await lastValueFrom(
      this.httpService.get(
        `${process.env.API_PORTAL_RABELODIGITAL}/api/v1/person/current`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );

    const data = response.data;

    const profile: SocialInterface = {
      id: data.user_id,
      email: data.corporate_email,
      firstName: data.first_name,
      lastName: data.last_name,
      roleId: data.superuser ? 1 : data.is_coordinator ? 2 : 3,
      statusId: 1,
      position: data?.position_display.title,
    };

    return profile;
  }

  public async getProfile(
    loginDto: AuthRabelodigitalLoginDto,
  ): Promise<SocialInterface> {
    const token = await this.getTokenByExternalApi(loginDto);

    return this.getProfileByToken(token);
  }
}
