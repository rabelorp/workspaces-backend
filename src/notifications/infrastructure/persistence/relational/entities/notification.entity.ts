import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import {
  ActionNotification,
  EntityNotification,
} from 'src/interfaces/notifications.interface';

@Entity({
  name: 'notification',
})
export class NotificationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column()
  entity: EntityNotification;

  @ApiProperty()
  @Column()
  action: ActionNotification;

  @ApiProperty()
  @Column({ type: 'text' })
  message: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @Index()
  user: UserEntity;

  @ApiProperty()
  @Column({ default: false })
  read: boolean;

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
