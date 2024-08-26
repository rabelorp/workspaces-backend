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
  name: 'work_station',
})
export class WorkStationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column()
  location: string;

  @ApiProperty()
  @Column()
  stationName: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  capacity?: number;

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
