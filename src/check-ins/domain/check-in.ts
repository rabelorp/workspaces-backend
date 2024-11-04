import { ApiProperty } from '@nestjs/swagger';

export class CheckIn {
  @ApiProperty()
  lockerReservationId?: string | null;

  @ApiProperty()
  reservationId: string;

  // @ApiProperty()
  checkInDate: Date;

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
