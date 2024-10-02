import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';

@Entity({
  name: 'locker',
})
export class LockerEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ default: true })
  activate: boolean;

  @ApiProperty()
  @Column()
  lockerName: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  locationId: string;

  @ManyToOne(() => LocationEntity, { eager: true })
  @JoinColumn({ name: 'locationId' })
  @Index()
  location: LocationEntity;

  @ApiProperty()
  @Column()
  photoId: string;

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
