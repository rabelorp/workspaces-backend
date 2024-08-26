import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkStationReservationEntity } from '../../../../work-station-reservations/infrastructure/persistence/relational/entities/work-station-reservation.entity';
import { WorkStationEntity } from 'src/work-stations/infrastructure/persistence/relational/entities/work-station.entity';

@Injectable()
export class WorkStationReservationFactory {
  constructor(
    @InjectRepository(WorkStationReservationEntity)
    private repositoryWorkStationReservation: Repository<WorkStationReservationEntity>,
    @InjectRepository(WorkStationEntity)
    private workStationRepository: Repository<WorkStationEntity>,
  ) {}

  async createRandomWorkStationReservation() {
    const existingWorkStation = await this.workStationRepository.findOne({
      where: {},
    });

    if (!existingWorkStation) {
      throw new Error('Nenhum estação de trabalho encontrada, gere uma!');
    }

    return this.repositoryWorkStationReservation.create({
      userId: 1,
      reservationTime: 'matutino',
      reservationDate: new Date(),
      workstationId: existingWorkStation.id,
      observation: faker.lorem.word(5),
    });
  }
}
