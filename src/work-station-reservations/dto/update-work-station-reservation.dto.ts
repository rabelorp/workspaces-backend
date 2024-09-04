import { PartialType } from '@nestjs/swagger';
import { CreateWorkStationReservationDto } from './create-work-station-reservation.dto';

export class UpdateWorkStationReservationDto extends PartialType(
  CreateWorkStationReservationDto,
) {}
