import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/room.entity';
import { RoomReservationEntity } from '../../../../room-reservations/infrastructure/persistence/relational/entities/room-reservation.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { ReservationEnum } from 'src/interfaces/reservations.enum';
import { Additionals } from 'src/room-reservations/additionals.class';
@Injectable()
export class RoomReservationFactory {
  constructor(
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(RoomReservationEntity)
    private repositoryRoomReservation: Repository<RoomReservationEntity>,
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

  getRandomAdditionals(): Additionals[] {
    const items = ['água', 'café', 'leite', 'chá', 'snacks'];

    const additionalsCount = faker.number.int({ min: 1, max: 5 });

    const additionals = Array.from({ length: additionalsCount }, () => ({
      item: faker.helpers.arrayElement(items),
      quantity: faker.number.int({ min: 3, max: 5 }),
    }));

    return additionals;
  }

  async createRandomRoomReservation() {
    const existingUser = await this.repositoryUser.findOne({
      where: {},
    });

    if (!existingUser) {
      throw new Error('Nenhum sala de reunião encontrada, gere uma!');
    }

    const existingRoom = await this.roomRepository.findOne({
      where: {},
    });

    if (!existingRoom) {
      throw new Error('Nenhum sala de reunião encontrada, gere uma!');
    }

    return this.repositoryRoomReservation.create({
      userId: existingUser.id,
      reservationTime: this.getRandomReservationTime(),
      reservationDate: new Date(),
      room: existingRoom,
      observation: faker.lorem.word(5),
      reservationStatus: this.getRandomReservationStatus(),
      additionals: this.getRandomAdditionals(),
    });
  }
}
