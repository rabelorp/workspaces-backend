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
import { ReservationEnum } from 'src/interfaces/reservations.enum';
import { GarageEntity } from 'src/garages/infrastructure/persistence/relational/entities/garage.entity';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { LockerReservationEntity } from 'src/locker-reservations/infrastructure/persistence/relational/entities/locker-reservation.entity';
import { CheckInEntity } from 'src/check-ins/infrastructure/persistence/relational/entities/check-in.entity';

@Entity({
  name: 'garage_reservation',
})
export class GarageReservationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  lockerReservationId?: string;

  @ManyToOne(() => LockerReservationEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'lockerReservationId' })
  @Index()
  lockerReservation: LockerReservationEntity;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, length: 7 })
  vehiclePlate: string;

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
  observation?: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationTime,
    default: ReservationTime.MATUTINO,
  })
  reservationTime: ReservationTime;

  @ApiProperty()
  @Column({ type: 'date' })
  reservationDate: Date;

  @ManyToOne(() => GarageEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'garageId' })
  @Index()
  garage: GarageEntity;

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
