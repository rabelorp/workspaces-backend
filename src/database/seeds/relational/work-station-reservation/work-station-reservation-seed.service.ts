import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkStationReservationEntity } from '../../../../work-station-reservations/infrastructure/persistence/relational/entities/work-station-reservation.entity';
import { Repository } from 'typeorm';
import { WorkStationReservationFactory } from './work-station-reservation.factory';

@Injectable()
export class WorkStationReservationSeedService {
  constructor(
    @InjectRepository(WorkStationReservationEntity)
    private repository: Repository<WorkStationReservationEntity>,
    private workStationReservationFactory: WorkStationReservationFactory,
  ) {}

  async run() {
    const teste =
      await this.workStationReservationFactory.createRandomWorkStationReservation();
    await this.repository.save(teste);
  }
}
