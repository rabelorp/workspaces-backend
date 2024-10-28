import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkStationReservationEntity } from '../entities/work-station-reservation.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { WorkStationReservation } from '../../../../domain/work-station-reservation';
import { WorkStationReservationRepository } from '../../work-station-reservation.abstract';
import { WorkStationReservationMapper } from '../mappers/work-station-reservation.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class WorkStationReservationRelationalRepository
  implements WorkStationReservationRepository
{
  constructor(
    @InjectRepository(WorkStationReservationEntity)
    private readonly workStationReservationRepository: Repository<WorkStationReservationEntity>,
  ) {}

  async create(data: WorkStationReservation): Promise<WorkStationReservation> {
    const persistenceModel = WorkStationReservationMapper.toPersistence(data);
    const newEntity = await this.workStationReservationRepository.save(
      this.workStationReservationRepository.create(persistenceModel),
    );
    return WorkStationReservationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[WorkStationReservation[], number]> {
    const { page, limit, filters = {} } = paginationOptions;

    const [entities, totalItems] =
      await this.workStationReservationRepository.findAndCount({
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
      });

    const data = entities.map((entity) =>
      WorkStationReservationMapper.toDomain(entity),
    );
    return [data, totalItems];
  }

  async findAll(
    id: WorkStationReservation['workstationId'],
  ): Promise<WorkStationReservation[]> {
    const entities = await this.workStationReservationRepository.find({
      where: { workstation: { id } },
    });

    return entities.map((user) => WorkStationReservationMapper.toDomain(user));
  }

  async findById(
    id: WorkStationReservation['id'] | WorkStationReservation['workstationId'],
    includeDeleted = false,
  ): Promise<NullableType<WorkStationReservation>> {
    let entity = await this.workStationReservationRepository.findOne({
      where: { id },
      withDeleted: includeDeleted,
    });

    if (!entity) {
      entity = await this.workStationReservationRepository.findOne({
        where: { workstation: { id } },
        withDeleted: includeDeleted,
      });
    }

    return entity ? WorkStationReservationMapper.toDomain(entity) : null;
  }

  async update(
    id: WorkStationReservation['id'],
    payload: Partial<WorkStationReservation>,
  ): Promise<WorkStationReservation> {
    const entity = await this.workStationReservationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.workStationReservationRepository.save(
      this.workStationReservationRepository.create(
        WorkStationReservationMapper.toPersistence({
          ...WorkStationReservationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return WorkStationReservationMapper.toDomain(updatedEntity);
  }

  async remove(id: WorkStationReservation['id']): Promise<void> {
    await this.workStationReservationRepository.softDelete(id);
  }

  async validateReservationAvailability(
    workstationId: WorkStationReservation['workstationId'],
    reservationTime: WorkStationReservation['reservationTime'],
    reservationDate: WorkStationReservation['reservationDate'],
  ): Promise<WorkStationReservation[]> {
    const entities = await this.workStationReservationRepository.find({
      where: {
        workstation: { id: workstationId },
        reservationDate,
        reservationTime,
      },
    });

    return entities.map((user) => WorkStationReservationMapper.toDomain(user));
  }
}
