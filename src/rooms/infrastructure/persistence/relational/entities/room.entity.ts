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
  name: 'room',
})
export class RoomEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column()
  exclusive: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  capacity?: number;

  @ApiProperty()
  @Column()
  roomName: string;

  // @ApiProperty()
  // @Column()
  // locationId: string;

  @Column()
  locationId: string;

  @ManyToOne(() => LocationEntity)
  @JoinColumn({ name: 'locationId' })
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
}
