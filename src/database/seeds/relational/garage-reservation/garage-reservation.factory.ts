import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GarageEntity } from '../../../../garages/infrastructure/persistence/relational/entities/garage.entity';
import { GarageReservationEntity } from '../../../../garage-reservations/infrastructure/persistence/relational/entities/garage-reservation.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { ReservationEnum } from 'src/interfaces/reservations.enum';

@Injectable()
export class GarageReservationFactory {
  constructor(
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
    @InjectRepository(GarageEntity)
    private garageRepository: Repository<GarageEntity>,
    @InjectRepository(GarageReservationEntity)
    private repositoryGarageReservation: Repository<GarageReservationEntity>,
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

  async createRandomGarageReservation() {
    const existingUser = await this.repositoryUser.findOne({
      where: {},
    });

    if (!existingUser) {
      throw new Error('Nenhum usuário encontrado, gere uma!');
    }

    const existingGarage = await this.garageRepository.findOne({
      where: {},
    });

    if (!existingGarage) {
      throw new Error('Nenhuma garagem encontrada, gere uma!');
    }

    return this.repositoryGarageReservation.create({
      userId: existingUser.id,
      reservationTime: this.getRandomReservationTime(),
      reservationDate: new Date(),
      garage: existingGarage,
      observation: faker.lorem.word(5),
      vehiclePlate: faker.vehicle.vrm(),
      reservationStatus: this.getRandomReservationStatus(),
    });
  }
}
