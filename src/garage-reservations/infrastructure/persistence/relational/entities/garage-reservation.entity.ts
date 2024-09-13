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
import { ReservationEnum } from 'src/interfaces/reservations.enum';
import { GarageEntity } from 'src/garages/infrastructure/persistence/relational/entities/garage.entity';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';

@Entity({
  name: 'garage_reservation',
})
export class GarageReservationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, length: 7 })
  vehiclePlate: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationEnum,
    default: ReservationEnum.pendent,
  })
  reservationStatus: ReservationEnum;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  observation?: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReservationTime,
    default: ReservationTime.INTEGRAL,
  })
  reservationTime: ReservationTime;

  @ApiProperty()
  @Column({ type: 'date' })
  reservationDate: Date;

  @ManyToOne(() => GarageEntity, { eager: true })
  @JoinColumn({ name: 'garageId' })
  garage: GarageEntity;

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
