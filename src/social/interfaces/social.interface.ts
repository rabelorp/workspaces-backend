import { FileDto } from 'src/files/dto/file.dto';
import { RoleEnum } from '../../roles/roles.enum';
import { StatusEnum } from '../../statuses/statuses.enum';

export interface SocialInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roleId?: RoleEnum;
  statusId?: StatusEnum;
  accessToken?: string;
  position?: string;
  photo?: FileDto | null;
}
