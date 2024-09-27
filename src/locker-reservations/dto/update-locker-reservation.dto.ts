// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateLockerReservationDto } from './create-locker-reservation.dto';

export class UpdateLockerReservationDto extends PartialType(
  CreateLockerReservationDto,
) {}
