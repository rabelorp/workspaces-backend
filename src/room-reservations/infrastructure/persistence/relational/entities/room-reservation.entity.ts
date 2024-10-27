import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../../../../interfaces/reservations.enum';
import { RoomEntity } from 'src/rooms/infrastructure/persistence/relational/entities/room.entity';
import { Additionals } from 'src/room-reservations/additionals.class';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { LockerReservationEntity } from 'src/locker-reservations/infrastructure/persistence/relational/entities/locker-reservation.entity';
import { CheckInEntity } from 'src/check-ins/infrastructure/persistence/relational/entities/check-in.entity';

@Entity({
  name: 'room_reservation',
})
export class RoomReservationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  lockerReservationId?: string;

  @ManyToOne(() => LockerReservationEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'lockerReservationId' })
  @Index()
  lockerReservation: LockerReservationEntity;

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  additionals?: Additionals[];

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationEnum,
    default: ReservationEnum.PENDENT,
  })
  reservationStatus: ReservationEnum;

  @ApiProperty()
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, {
    eager: true,
    nullable: false,
  })
  @Index()
  user: UserEntity;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  observation: string;

  @ManyToOne(() => RoomEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'roomId' })
  @Index()
  room: RoomEntity;

  @ApiProperty()
  @Column({ type: 'date' })
  reservationDate: Date;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationTime,
    default: ReservationTime.MATUTINO,
  })
  reservationTime: ReservationTime;

  @ManyToOne(() => CheckInEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'checkInId' })
  @Index()
  checkIn: CheckInEntity;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
