import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { ExclusiveRoomType } from 'src/interfaces/exclusive-room.enum';

@Entity({
  name: 'room',
})
export class RoomEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ default: true })
  activate: boolean;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ExclusiveRoomType,
    default: ExclusiveRoomType.ADM,
  })
  exclusive: ExclusiveRoomType;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  capacity?: number;

  @ApiProperty()
  @Column()
  roomName: string;

  @Column()
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
}
