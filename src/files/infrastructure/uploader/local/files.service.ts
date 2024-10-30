import * as fs from 'fs';
import * as path from 'path';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileRepository } from '../../persistence/file.repository';
import { AllConfigType } from '../../../../config/config.type';
import { FileType } from '../../../domain/file';

@Injectable()
export class FilesLocalService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly fileRepository: FileRepository,
  ) {}

  async uploadBase64(
    base64: string,
    filename: string,
  ): Promise<{ file: FileType }> {
    try {
      const filePath = this.saveFileLocally(base64, filename);
      return this.create({
        originalname: filename,
        path: filePath,
      } as Express.Multer.File);
    } catch (error) {
      throw new UnprocessableEntityException('Failed to upload base64 image');
    }
  }

  private saveFileLocally(base64: string, filename: string): string {
    const base64Data = base64.replace(/^b'|^data:image\/[a-z]+;base64,/, '');

    if (!base64Data) {
      throw new UnprocessableEntityException('Invalid base64 string');
    }

    const buffer = Buffer.from(base64Data, 'base64');
    const uploadPath = path.join(process.cwd(), '/files');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, filename);
    fs.writeFileSync(filePath, buffer);

    return `${this.configService.get('app.apiPrefix', { infer: true })}/v1/files/${filename}`;
  }

  async create(file: Express.Multer.File): Promise<{ file: FileType }> {
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: 'selectFile',
        },
      });
    }

    return {
      file: await this.fileRepository.create({
        path: `/${this.configService.get('app.apiPrefix', {
          infer: true,
        })}/v1/${file.path}`,
      }),
    };
  }
}
