import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { LockerEntity } from 'src/lockers/infrastructure/persistence/relational/entities/locker.entity';
import { ReservationEnum } from '@interfaces/reservations.enum';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { ReservationTime } from '@interfaces/reservation-time.enum';
import { CheckInEntity } from 'src/check-ins/infrastructure/persistence/relational/entities/check-in.entity';

@Entity({
  name: 'locker_reservation',
})
export class LockerReservationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ type: 'date' })
  reservationDate: Date;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  observation?: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationTime,
    default: ReservationTime.MATUTINO,
  })
  reservationTime: ReservationTime;

  @ApiProperty()
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @Index()
  user: UserEntity;

  @ManyToOne(() => LockerEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'lockerId' })
  @Index()
  locker: LockerEntity;

  @ManyToOne(() => CheckInEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'checkInId' })
  @Index()
  checkIn: CheckInEntity;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationEnum,
    default: ReservationEnum.PENDENT,
  })
  reservationStatus: ReservationEnum;

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
