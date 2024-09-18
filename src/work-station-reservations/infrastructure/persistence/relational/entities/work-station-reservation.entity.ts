import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../../../../interfaces/reservations.enum';
import { WorkStationEntity } from 'src/work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';

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
  @Column({ type: 'int' })
  userId: number;

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
