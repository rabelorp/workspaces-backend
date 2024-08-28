import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'room_reservation',
})
export class RoomReservationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  observation: string;

  @ApiProperty()
  @Column()
  roomId: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  reservationDate: Date;

  @ApiProperty()
  @Column()
  reservationTime: string;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
