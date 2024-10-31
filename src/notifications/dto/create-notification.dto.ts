import { IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  ActionNotification,
  EntityNotification,
} from 'src/interfaces/notifications.interface';
import { ReservationEnum } from '@interfaces/reservations.enum';

export class CreateNotificationDto {
  @ApiProperty()
  @IsEnum(EntityNotification)
  entity: EntityNotification;

  @ApiProperty()
  @IsEnum(ActionNotification)
  action: ActionNotification;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  read: boolean;

  @IsUUID()
  reservationId: string;

  @IsBoolean()
  activate: boolean;

  checkInId?: string;

  lockerReservationId?: string;

  reservationStatus?: ReservationEnum;
}
