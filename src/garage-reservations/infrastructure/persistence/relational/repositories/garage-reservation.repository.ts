import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GarageReservationEntity } from '../entities/garage-reservation.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { GarageReservation } from '../../../../domain/garage-reservation';
import { GarageReservationRepository } from '../../garage-reservation.repository';
import { GarageReservationMapper } from '../mappers/garage-reservation.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class GarageReservationRelationalRepository
  implements GarageReservationRepository
{
  constructor(
    @InjectRepository(GarageReservationEntity)
    private readonly garageReservationRepository: Repository<GarageReservationEntity>,
  ) {}

  async create(data: GarageReservation): Promise<GarageReservation> {
    const persistenceModel = GarageReservationMapper.toPersistence(data);
    const newEntity = await this.garageReservationRepository.save(
      this.garageReservationRepository.create(persistenceModel),
    );
    return GarageReservationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<GarageReservation[]> {
    const { page, limit, filters = {} } = paginationOptions;

    const entities = await this.garageReservationRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return entities.map((user) => GarageReservationMapper.toDomain(user));
  }

  async findAll(
    id: GarageReservation['garageId'],
  ): Promise<GarageReservation[]> {
    const entities = await this.garageReservationRepository.find({
      where: { garage: { id } },
    });

    return entities.map((user) => GarageReservationMapper.toDomain(user));
  }

  async findById(
    id: GarageReservation['id'] | GarageReservation['garageId'],
  ): Promise<NullableType<GarageReservation>> {
    let entity = await this.garageReservationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      entity = await this.garageReservationRepository.findOne({
        where: { garage: { id } },
      });
    }

    return entity ? GarageReservationMapper.toDomain(entity) : null;
  }

  async update(
    id: GarageReservation['id'],
    payload: Partial<GarageReservation>,
  ): Promise<GarageReservation> {
    const entity = await this.garageReservationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.garageReservationRepository.save(
      this.garageReservationRepository.create(
        GarageReservationMapper.toPersistence({
          ...GarageReservationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return GarageReservationMapper.toDomain(updatedEntity);
  }

  async remove(id: GarageReservation['id']): Promise<void> {
    await this.garageReservationRepository.delete(id);
  }
}
