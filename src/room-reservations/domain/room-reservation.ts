import { ApiProperty } from '@nestjs/swagger';

export class RoomReservation {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  observation: string;

  @ApiProperty()
  roomId: string;

  @ApiProperty()
  reservationDate: Date;

  @ApiProperty()
  reservationTime: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
