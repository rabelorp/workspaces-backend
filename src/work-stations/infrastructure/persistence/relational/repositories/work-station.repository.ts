import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkStationEntity } from '../entities/work-station.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { WorkStation } from '../../../../domain/work-station';
import { WorkStationRepository } from '../../work-station.repository';
import { WorkStationMapper } from '../mappers/work-station.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class WorkStationRelationalRepository implements WorkStationRepository {
  constructor(
    @InjectRepository(WorkStationEntity)
    private readonly workStationRepository: Repository<WorkStationEntity>,
  ) {}

  async create(data: WorkStation): Promise<WorkStation> {
    const persistenceModel = WorkStationMapper.toPersistence(data);
    const newEntity = await this.workStationRepository.save(
      this.workStationRepository.create(persistenceModel),
    );
    return WorkStationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[WorkStation[], number]> {
    const { page, limit, filters = {} } = paginationOptions;
    const [entities, totalItems] =
      await this.workStationRepository.findAndCount({
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
      });

    const data = entities.map((entity) => WorkStationMapper.toDomain(entity));
    return [data, totalItems];
  }

  async findById(id: WorkStation['id']): Promise<NullableType<WorkStation>> {
    const entity = await this.workStationRepository.findOne({
      where: { id },
    });

    return entity ? WorkStationMapper.toDomain(entity) : null;
  }

  async update(
    id: WorkStation['id'],
    payload: Partial<WorkStation>,
  ): Promise<WorkStation> {
    const entity = await this.workStationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.workStationRepository.save(
      this.workStationRepository.create(
        WorkStationMapper.toPersistence({
          ...WorkStationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return WorkStationMapper.toDomain(updatedEntity);
  }

  async remove(id: WorkStation['id']): Promise<void> {
    await this.workStationRepository.softDelete(id);
  }
}
