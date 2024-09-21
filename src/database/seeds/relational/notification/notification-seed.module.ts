import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from '../../../../notifications/infrastructure/persistence/relational/entities/notification.entity';
import { NotificationSeedService } from './notification-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  providers: [NotificationSeedService],
  exports: [NotificationSeedService],
})
export class NotificationSeedModule {}
