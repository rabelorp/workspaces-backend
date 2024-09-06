import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkStationReservationEntity } from '../../../../work-station-reservations/infrastructure/persistence/relational/entities/work-station-reservation.entity';
import { WorkStationEntity } from 'src/work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class WorkStationReservationFactory {
  constructor(
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
    @InjectRepository(WorkStationReservationEntity)
    private repositoryWorkStationReservation: Repository<WorkStationReservationEntity>,
    @InjectRepository(WorkStationEntity)
    private workStationRepository: Repository<WorkStationEntity>,
  ) {}

  async createRandomWorkStationReservation() {
    const existingUser = await this.repositoryUser.findOne({
      where: {},
    });

    if (!existingUser) {
      throw new Error('Nenhum usuario encontrado, gere uma!');
    }

    const existingWorkStation = await this.workStationRepository.findOne({
      where: {},
    });

    if (!existingWorkStation) {
      throw new Error('Nenhum estação de trabalho encontrada, gere uma!');
    }

    return this.repositoryWorkStationReservation.create({
      userId: existingUser.id,
      reservationTime: 'matutino',
      reservationDate: new Date(),
      workstation: existingWorkStation,
      observation: faker.lorem.word(5),
    });
  }
}
