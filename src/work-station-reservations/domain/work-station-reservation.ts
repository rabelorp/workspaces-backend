import { ApiProperty } from '@nestjs/swagger';

export class WorkStationReservation {
  @ApiProperty()
  observation: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  reservationTime: string;

  @ApiProperty()
  reservationDate: Date;

  @ApiProperty()
  workstationId: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
