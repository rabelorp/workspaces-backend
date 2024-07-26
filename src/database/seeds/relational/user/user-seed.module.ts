import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSeedService } from './user-seed.service';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { UserFactory } from './user.factory';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, StatusEntity])],
  providers: [UserSeedService, UserFactory],
  exports: [UserSeedService, UserFactory],
})
export class UserSeedModule {}
