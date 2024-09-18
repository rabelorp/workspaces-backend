import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entities/room.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Room } from '../../../../domain/room';
import { RoomRepository } from '../../room.repository';
import { RoomMapper } from '../mappers/room.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RoomRelationalRepository implements RoomRepository {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async create(data: Room): Promise<Room> {
    const persistenceModel = RoomMapper.toPersistence(data);
    const newEntity = await this.roomRepository.save(
      this.roomRepository.create(persistenceModel),
    );
    return RoomMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Room[]> {
    const { page, limit, filters = {} } = paginationOptions;
    const entities = await this.roomRepository.find({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return entities.map((user) => RoomMapper.toDomain(user));
  }

  async findById(id: Room['id']): Promise<NullableType<Room>> {
    const entity = await this.roomRepository.findOne({
      where: { id },
    });

    return entity ? RoomMapper.toDomain(entity) : null;
  }

  async update(id: Room['id'], payload: Partial<Room>): Promise<Room> {
    const entity = await this.roomRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.roomRepository.save(
      this.roomRepository.create(
        RoomMapper.toPersistence({
          ...RoomMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RoomMapper.toDomain(updatedEntity);
  }

  async remove(id: Room['id']): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
