import { ApiProperty } from '@nestjs/swagger';
import {
  ActionNotification,
  EntityNotification,
} from 'src/interfaces/notifications.interface';

export class Notification {
  @ApiProperty()
  entity: EntityNotification;

  @ApiProperty()
  action: ActionNotification;

  @ApiProperty()
  message: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  read: boolean;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
