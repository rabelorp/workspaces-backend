import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomReservationEntity } from '../entities/room-reservation.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { RoomReservation } from '../../../../domain/room-reservation';
import { RoomReservationRepository } from '../../room-reservation.repository';
import { RoomReservationMapper } from '../mappers/room-reservation.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RoomReservationRelationalRepository
  implements RoomReservationRepository
{
  constructor(
    @InjectRepository(RoomReservationEntity)
    private readonly roomReservationRepository: Repository<RoomReservationEntity>,
  ) {}

  async create(data: RoomReservation): Promise<RoomReservation> {
    const persistenceModel = RoomReservationMapper.toPersistence(data);
    const newEntity = await this.roomReservationRepository.save(
      this.roomReservationRepository.create(persistenceModel),
    );
    return RoomReservationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RoomReservation[]> {
    const entities = await this.roomReservationRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => RoomReservationMapper.toDomain(user));
  }

  async findById(
    id: RoomReservation['id'],
  ): Promise<NullableType<RoomReservation>> {
    const entity = await this.roomReservationRepository.findOne({
      where: { id },
    });

    return entity ? RoomReservationMapper.toDomain(entity) : null;
  }

  async update(
    id: RoomReservation['id'],
    payload: Partial<RoomReservation>,
  ): Promise<RoomReservation> {
    const entity = await this.roomReservationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.roomReservationRepository.save(
      this.roomReservationRepository.create(
        RoomReservationMapper.toPersistence({
          ...RoomReservationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RoomReservationMapper.toDomain(updatedEntity);
  }

  async remove(id: RoomReservation['id']): Promise<void> {
    await this.roomReservationRepository.delete(id);
  }
}
