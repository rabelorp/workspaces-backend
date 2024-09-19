import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../../../../interfaces/reservations.enum';
import { WorkStationEntity } from 'src/work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'work_station_reservation',
})
export class WorkStationReservationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationEnum,
    default: ReservationEnum.PENDENT,
  })
  reservationStatus: ReservationEnum;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  observation: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @Index()
  user: UserEntity;

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

  @ManyToOne(() => WorkStationEntity, { eager: true })
  @JoinColumn({ name: 'workStationId' })
  @Index()
  workstation: WorkStationEntity;

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
