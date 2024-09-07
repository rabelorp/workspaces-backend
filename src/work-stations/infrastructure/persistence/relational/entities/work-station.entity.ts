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
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';

@Entity({
  name: 'work_station',
})
export class WorkStationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ nullable: true })
  photoId?: string;

  @Column()
  locationId: string;

  @ManyToOne(() => LocationEntity, { eager: true })
  @JoinColumn({ name: 'locationId' })
  location: LocationEntity;

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
