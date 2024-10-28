import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LockerReservationEntity } from '../entities/locker-reservation.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { LockerReservation } from '../../../../domain/locker-reservation';
import { LockerReservationRepository } from '../../locker-reservation.abstract';
import { LockerReservationMapper } from '../mappers/locker-reservation.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class LockerReservationRelationalRepository
  implements LockerReservationRepository
{
  constructor(
    @InjectRepository(LockerReservationEntity)
    private readonly lockerReservationRepository: Repository<LockerReservationEntity>,
  ) {}

  async create(data: LockerReservation): Promise<LockerReservation> {
    const persistenceModel = LockerReservationMapper.toPersistence(data);
    const newEntity = await this.lockerReservationRepository.save(
      this.lockerReservationRepository.create(persistenceModel),
    );
    return LockerReservationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[LockerReservation[], number]> {
    const { page, limit, filters = {} } = paginationOptions;
    const [entities, totalItems] =
      await this.lockerReservationRepository.findAndCount({
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
      });

    const data = entities.map((entity) =>
      LockerReservationMapper.toDomain(entity),
    );
    return [data, totalItems];
  }

  async findAll(
    id: LockerReservation['lockerId'],
  ): Promise<LockerReservation[]> {
    const entities = await this.lockerReservationRepository.find({
      where: { locker: { id } },
    });

    return entities.map((user) => LockerReservationMapper.toDomain(user));
  }

  async findById(
    id: LockerReservation['id'],
    includeDeleted = false,
  ): Promise<NullableType<LockerReservation>> {
    const entity = await this.lockerReservationRepository.findOne({
      where: { id },
      withDeleted: includeDeleted,
    });

    return entity ? LockerReservationMapper.toDomain(entity) : null;
  }

  async update(
    id: LockerReservation['id'],
    payload: Partial<LockerReservation>,
  ): Promise<LockerReservation> {
    const entity = await this.lockerReservationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.lockerReservationRepository.save(
      this.lockerReservationRepository.create(
        LockerReservationMapper.toPersistence({
          ...LockerReservationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LockerReservationMapper.toDomain(updatedEntity);
  }

  async remove(id: LockerReservation['id']): Promise<void> {
    await this.lockerReservationRepository.softDelete(id);
  }

  async validateReservationAvailability(
    lockerId: LockerReservation['lockerId'],
    reservationTime: LockerReservation['reservationTime'],
    reservationDate: LockerReservation['reservationDate'],
  ): Promise<LockerReservation[]> {
    const entities = await this.lockerReservationRepository.find({
      where: {
        locker: { id: lockerId },
        reservationDate,
        reservationTime,
      },
    });

    return entities.map((user) => LockerReservationMapper.toDomain(user));
  }
}
