import { PartialType } from '@nestjs/swagger';
import { CreateGarageReservationDto } from './create-garage-reservation.dto';

export class UpdateGarageReservationDto extends PartialType(
  CreateGarageReservationDto,
) {}
