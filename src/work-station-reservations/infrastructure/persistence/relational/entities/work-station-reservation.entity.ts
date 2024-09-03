import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationEnum } from '../../../../../interfaces/reservations.enum';

@Entity({
  name: 'work_station_reservation',
})
export class WorkStationReservationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationEnum,
    default: ReservationEnum.pendent,
  })
  reservationStatus: ReservationEnum;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  observation: string;

  @ApiProperty()
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  reservationTime: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  reservationDate: Date;

  @ApiProperty()
  @Column({ type: 'uuid' })
  workstationId: string;

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
