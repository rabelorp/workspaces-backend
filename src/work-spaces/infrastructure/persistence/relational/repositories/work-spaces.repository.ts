import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkSpacesEntity } from '../entities/work-spaces.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { WorkSpaces } from '../../../../domain/work-spaces';
import { WorkSpacesRepository } from '../../work-spaces.abstract';
import { WorkSpacesMapper } from '../mappers/work-spaces.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class WorkSpacesRelationalRepository implements WorkSpacesRepository {
  constructor(
    @InjectRepository(WorkSpacesEntity)
    private readonly workSpacesRepository: Repository<WorkSpacesEntity>,
  ) {}

  async create(data: WorkSpaces): Promise<WorkSpaces> {
    const persistenceModel = WorkSpacesMapper.toPersistence(data);
    const newEntity = await this.workSpacesRepository.save(
      this.workSpacesRepository.create(persistenceModel),
    );
    return WorkSpacesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[WorkSpaces[], number]> {
    const { page, limit, filters = {} } = paginationOptions;
    const [entities, totalItems] = await this.workSpacesRepository.findAndCount(
      {
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
      },
    );

    const data = entities.map((entity) => WorkSpacesMapper.toDomain(entity));
    return [data, totalItems];
  }

  async findById(id: WorkSpaces['id']): Promise<NullableType<WorkSpaces>> {
    const entity = await this.workSpacesRepository.findOne({
      where: { id },
    });

    return entity ? WorkSpacesMapper.toDomain(entity) : null;
  }

  async update(
    id: WorkSpaces['id'],
    payload: Partial<WorkSpaces>,
  ): Promise<WorkSpaces> {
    const entity = await this.workSpacesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.workSpacesRepository.save(
      this.workSpacesRepository.create(
        WorkSpacesMapper.toPersistence({
          ...WorkSpacesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return WorkSpacesMapper.toDomain(updatedEntity);
  }

  async remove(id: WorkSpaces['id']): Promise<void> {
    await this.workSpacesRepository.delete(id);
  }
}
