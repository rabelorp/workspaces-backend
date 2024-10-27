import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
  DeleteDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';

@Entity({
  name: 'work_station',
})
export class WorkStationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ default: true })
  activate: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  photoId?: string;

  @Column()
  locationId: string;

  @ManyToOne(() => LocationEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'locationId' })
  @Index()
  location: LocationEntity;

  @ApiProperty()
  @Column()
  stationName: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: false })
  capacity: number;

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
