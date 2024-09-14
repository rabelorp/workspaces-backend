import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { LocationType, LocationCategory } from 'src/interfaces/location.enum';

@Entity({
  name: 'location',
})
export class LocationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: LocationCategory,
    default: LocationCategory.INDOOR,
  })
  locationCategory: LocationCategory;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: LocationType,
    default: LocationType.WORKSTATION,
  })
  locationType: LocationType;

  @ApiProperty()
  @Column()
  locationName: string;

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
