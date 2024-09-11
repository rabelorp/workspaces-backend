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
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';

@Entity({
  name: 'garage',
})
export class GarageEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column()
  photoId: string;

  @Column({ type: 'uuid' })
  locationId: string;

  @ManyToOne(() => LocationEntity, { eager: true })
  @JoinColumn({ name: 'locationId' })
  location: LocationEntity;

  @ApiProperty()
  @Column()
  garageName: string;

  @ApiProperty()
  @Column()
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
}
