import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GarageEntity } from '../entities/garage.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Garage } from '../../../../domain/garage';
import { GarageRepository } from '../../garage.repository';
import { GarageMapper } from '../mappers/garage.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class GarageRelationalRepository implements GarageRepository {
  constructor(
    @InjectRepository(GarageEntity)
    private readonly garageRepository: Repository<GarageEntity>,
  ) {}

  async create(data: Garage): Promise<Garage> {
    const persistenceModel = GarageMapper.toPersistence(data);
    const newEntity = await this.garageRepository.save(
      this.garageRepository.create(persistenceModel),
    );
    return GarageMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Garage[]> {
    const { page, limit, filters = {} } = paginationOptions;
    const entities = await this.garageRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return entities.map((user) => GarageMapper.toDomain(user));
  }

  async findById(id: Garage['id']): Promise<NullableType<Garage>> {
    const entity = await this.garageRepository.findOne({
      where: { id },
    });

    return entity ? GarageMapper.toDomain(entity) : null;
  }

  async update(id: Garage['id'], payload: Partial<Garage>): Promise<Garage> {
    const entity = await this.garageRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.garageRepository.save(
      this.garageRepository.create(
        GarageMapper.toPersistence({
          ...GarageMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return GarageMapper.toDomain(updatedEntity);
  }

  async remove(id: Garage['id']): Promise<void> {
    await this.garageRepository.delete(id);
  }
}
