// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRoomReservationDto } from './create-room-reservation.dto';

export class UpdateRoomReservationDto extends PartialType(
  CreateRoomReservationDto,
) {}
