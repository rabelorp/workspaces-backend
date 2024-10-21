import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from '../../../../dto/query-user.dto';
import { User } from '../../../../domain/user';
import { UserRepository } from '../../user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UsersRelationalRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const newEntity = await this.usersRepository.save(
      this.usersRepository.create(persistenceModel),
    );
    return UserMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<[User[], number]> {
    const where: FindOptionsWhere<UserEntity>[] = [];
    if (filterOptions?.roles?.length) {
      where.push({
        role: In(filterOptions.roles.map((role) => role.id)),
      });
    }

    if (filterOptions?.name) {
      const names = filterOptions.name.split(' ');

      if (names.length > 1) {
        where.push({
          firstName: ILike(`%${names[0]}%`),
          lastName: ILike(`%${names[1]}%`),
        });
      } else {
        where.push(
          { firstName: ILike(`%${names[0]}%`) },
          { lastName: ILike(`%${names[0]}%`) },
        );
      }
    }

    const [entities, totalItems] = await this.usersRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    const data = entities.map((entity) => UserMapper.toDomain(entity));
    return [data, totalItems];
  }

  async findById(id: User['id']): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOne({
      where: { id: String(id) },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByEmail(email: User['email']): Promise<NullableType<User>> {
    if (!email) return null;

    const entity = await this.usersRepository.findOne({
      where: { email },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findBySocialIdAndProvider({
    provider,
  }: {
    provider: User['provider'];
  }): Promise<NullableType<User>> {
    if (!provider) return null;

    const entity = await this.usersRepository.findOne({
      where: { provider },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async update(id: User['id'], payload: Partial<User>): Promise<User> {
    const entity = await this.usersRepository.findOne({
      where: { id: String(id) },
    });

    if (!entity) {
      throw new Error('User not found');
    }

    await this.usersRepository.update(
      id,
      UserMapper.toPersistence({
        ...UserMapper.toDomain(entity),
        ...payload,
      }),
    );
    const updatedEntity = await this.usersRepository.findOne({
      where: { id: String(id) },
    });

    if (!updatedEntity) {
      throw new Error('Updated user not found');
    }

    return UserMapper.toDomain(updatedEntity);
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async findByRole(roleId: number): Promise<any> {
    if (!roleId) return null;

    const entity = await this.usersRepository.find({
      where: {
        role: {
          id: 1,
        },
      },
      relations: ['role'],
    });

    return entity ? UserMapper.toDomainArray(entity) : null;
  }
}
