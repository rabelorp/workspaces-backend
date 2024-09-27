import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LockerEntity } from '../../../../lockers/infrastructure/persistence/relational/entities/locker.entity';
import { LockerReservationEntity } from '../../../../locker-reservations/infrastructure/persistence/relational/entities/locker-reservation.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { ReservationEnum } from 'src/interfaces/reservations.enum';

@Injectable()
export class LockerReservationFactory {
  constructor(
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
    @InjectRepository(LockerEntity)
    private lockerRepository: Repository<LockerEntity>,
    @InjectRepository(LockerReservationEntity)
    private repositoryLockerReservation: Repository<LockerReservationEntity>,
  ) {}

  getRandomReservationTime(): ReservationTime {
    const reservationTime = Object.values(ReservationTime).filter(
      (value) => typeof value === 'number',
    ) as ReservationTime[];
    return faker.helpers.arrayElement(reservationTime);
  }

  getRandomReservationStatus(): ReservationEnum {
    return faker.helpers.arrayElement(
      Object.values(ReservationEnum).filter(
        (value) => typeof value === 'number',
      ) as ReservationEnum[],
    );
  }

  async createRandomLockerReservation() {
    const existingUser = await this.repositoryUser.findOne({
      where: {},
    });

    if (!existingUser) {
      throw new Error('Nenhum usuário encontrado, gere um!');
    }

    const existingLocker = await this.lockerRepository.findOne({
      where: {},
    });

    if (!existingLocker) {
      throw new Error('Nenhum locker encontrado, gere um!');
    }

    return this.repositoryLockerReservation.create({
      userId: existingUser.id,
      reservationTime: this.getRandomReservationTime(),
      reservationDate: new Date(),
      locker: existingLocker,
      observation: faker.lorem.word(5),
      reservationStatus: this.getRandomReservationStatus(),
    });
  }
}
