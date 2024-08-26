// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateWorkStationReservationDto } from './create-work-station-reservation.dto';

export class UpdateWorkStationReservationDto extends PartialType(
  CreateWorkStationReservationDto,
) {}
