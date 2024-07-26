import { faker } from '@faker-js/faker';
import { RoleEnum } from '../../../../roles/roles.enum';
import { StatusEnum } from '../../../../statuses/statuses.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

@Injectable()
export class UserFactory {
  constructor(
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private repositoryRole: Repository<RoleEntity>,
    @InjectRepository(StatusEntity)
    private repositoryStatus: Repository<StatusEntity>,
  ) {}

  createRandomUser() {
    // Need for saving "this" context
    return () => {
      return this.repositoryUser.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: this.repositoryRole.create({
          id: RoleEnum.user,
          name: 'User',
        }),
        status: this.repositoryStatus.create({
          id: StatusEnum.active,
          name: 'Active',
        }),
      });
    };
  }
}
