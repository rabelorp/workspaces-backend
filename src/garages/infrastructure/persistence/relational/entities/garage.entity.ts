import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { GarageType } from 'src/interfaces/garage-type.enum';

@Entity({
  name: 'garage',
})
export class GarageEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ default: true })
  activate: boolean;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: GarageType,
    default: GarageType.CAR,
  })
  garageType: GarageType;

  @ApiProperty()
  @Column()
  photoId: string;

  @Column({ type: 'uuid' })
  locationId: string;

  @ManyToOne(() => LocationEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'locationId' })
  @Index()
  location: LocationEntity;

  @ApiProperty()
  @Column()
  garageName: string;

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
}
