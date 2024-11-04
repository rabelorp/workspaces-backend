import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AuthRabelodigitalLoginDto } from './dto/auth-rabelodigital-login.dto';
import { SocialInterface } from '../social/interfaces/social.interface';
import { lastValueFrom } from 'rxjs';
import { removeDomainFromEmail } from '../utils/email';
import { FilesLocalService } from 'src/files/infrastructure/uploader/local/files.service';
import * as crypto from 'crypto';
import { FileDto } from 'src/files/dto/file.dto';
@Injectable()
export class AuthRabelodigitalService {
  constructor(
    private readonly httpService: HttpService,
    private readonly filesService: FilesLocalService,
  ) {}
  private async getTokenByExternalApi(
    loginDto: AuthRabelodigitalLoginDto,
  ): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post(
        `${process.env.API_PORTAL_RABELODIGITAL}dsa/api/v1/auth`,
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

  private generateUniqueFilename(): string {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    return `${uniqueId}`;
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

    let photo: FileDto | null = null;
    if (data?.avatar) {
      const uploadedFile = await this.filesService.uploadBase64(
        data.avatar,
        `${this.generateUniqueFilename()}.avatar.png`,
      );
      photo = uploadedFile.file;
    }

    const profile: SocialInterface = {
      id: data.user_id,
      email: data.corporate_email,
      firstName: data.first_name,
      lastName: data.last_name,
      roleId: data.superuser ? 1 : data.is_coordinator ? 2 : 3,
      statusId: 1,
      position: data?.position_display.title,
      photo: photo,
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
