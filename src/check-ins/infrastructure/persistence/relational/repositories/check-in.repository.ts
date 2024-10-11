import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckInEntity } from '../entities/check-in.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { CheckIn } from '../../../../domain/check-in';
import { CheckInRepository } from '../../check-in.repository';
import { CheckInMapper } from '../mappers/check-in.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CheckInRelationalRepository implements CheckInRepository {
  constructor(
    @InjectRepository(CheckInEntity)
    private readonly checkInRepository: Repository<CheckInEntity>,
  ) {}

  async create(data: CheckIn): Promise<CheckIn> {
    const persistenceModel = CheckInMapper.toPersistence(data);
    const newEntity = await this.checkInRepository.save(
      this.checkInRepository.create(persistenceModel),
    );
    return CheckInMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<CheckIn[]> {
    const entities = await this.checkInRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => CheckInMapper.toDomain(user));
  }

  async findById(id: CheckIn['id']): Promise<NullableType<CheckIn>> {
    const entity = await this.checkInRepository.findOne({
      where: { id },
    });

    return entity ? CheckInMapper.toDomain(entity) : null;
  }

  async update(id: CheckIn['id'], payload: Partial<CheckIn>): Promise<CheckIn> {
    const entity = await this.checkInRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.checkInRepository.save(
      this.checkInRepository.create(
        CheckInMapper.toPersistence({
          ...CheckInMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CheckInMapper.toDomain(updatedEntity);
  }

  async remove(id: CheckIn['id']): Promise<void> {
    await this.checkInRepository.delete(id);
  }
}
