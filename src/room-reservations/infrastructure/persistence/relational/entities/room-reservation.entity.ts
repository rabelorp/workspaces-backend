import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../../../../interfaces/reservations.enum';
import { RoomEntity } from 'src/rooms/infrastructure/persistence/relational/entities/room.entity';

@Entity({
  name: 'room_reservation',
})
export class RoomReservationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationEnum,
    default: ReservationEnum.pendent,
  })
  reservationStatus: ReservationEnum;

  @ApiProperty()
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  observation: string;

  @ManyToOne(() => RoomEntity, { eager: true })
  @JoinColumn({ name: 'roomId' })
  room: RoomEntity;

  @ApiProperty()
  @Column({ type: 'date' })
  reservationDate: Date;

  @ApiProperty()
  @Column()
  reservationTime: string;

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
