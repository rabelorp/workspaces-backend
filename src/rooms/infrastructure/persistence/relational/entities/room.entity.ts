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

  @ApiProperty()
  @Column()
  location: string;

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
