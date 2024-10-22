import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LockerEntity } from '../entities/locker.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Locker } from '../../../../domain/locker';
import { LockerRepository } from '../../locker.abstract';
import { LockerMapper } from '../mappers/locker.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class LockerRelationalRepository implements LockerRepository {
  constructor(
    @InjectRepository(LockerEntity)
    private readonly lockerRepository: Repository<LockerEntity>,
  ) {}

  async create(data: Locker): Promise<Locker> {
    const persistenceModel = LockerMapper.toPersistence(data);
    const newEntity = await this.lockerRepository.save(
      this.lockerRepository.create(persistenceModel),
    );
    return LockerMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Locker[], number]> {
    const { page, limit, filters = {} } = paginationOptions;

    const [entities, totalItems] = await this.lockerRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    const data = entities.map((entity) => LockerMapper.toDomain(entity));
    return [data, totalItems];
  }

  async findById(id: Locker['id']): Promise<NullableType<Locker>> {
    const entity = await this.lockerRepository.findOne({
      where: { id },
    });

    return entity ? LockerMapper.toDomain(entity) : null;
  }

  async update(id: Locker['id'], payload: Partial<Locker>): Promise<Locker> {
    const entity = await this.lockerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.lockerRepository.save(
      this.lockerRepository.create(
        LockerMapper.toPersistence({
          ...LockerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LockerMapper.toDomain(updatedEntity);
  }

  async remove(id: Locker['id']): Promise<void> {
    await this.lockerRepository.delete(id);
  }
}
