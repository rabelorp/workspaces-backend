import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'check_in',
})
export class CheckInEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  lockerReservationId?: string | null;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: false })
  reservationId: string;

  // @ApiProperty()
  @Column({ nullable: false })
  @CreateDateColumn()
  checkInDate: Date;

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
