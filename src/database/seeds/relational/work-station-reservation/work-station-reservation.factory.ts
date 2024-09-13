import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkStationReservationEntity } from '../../../../work-station-reservations/infrastructure/persistence/relational/entities/work-station-reservation.entity';
import { WorkStationEntity } from 'src/work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { ReservationEnum } from 'src/interfaces/reservations.enum';

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

  getRandomReservationTime(): ReservationTime {
    const reservationTime = Object.values(ReservationTime);
    return faker.helpers.arrayElement(reservationTime);
  }

  getRandomReservationStatus(): ReservationEnum {
    return faker.helpers.arrayElement(
      Object.values(ReservationEnum).filter(
        (value) => typeof value === 'number',
      ) as ReservationEnum[],
    );
  }

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
      reservationTime: this.getRandomReservationTime(),
      reservationDate: new Date(),
      workstation: existingWorkStation,
      observation: faker.lorem.word(5),
      reservationStatus: this.getRandomReservationStatus(),
    });
  }
}
