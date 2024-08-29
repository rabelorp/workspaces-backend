import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/room.entity';
import { RoomReservationEntity } from '../../../../room-reservations/infrastructure/persistence/relational/entities/room-reservation.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

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
      reservationTime: 'matutino',
      reservationDate: new Date(),
      roomId: existingRoom.id,
      observation: faker.lorem.word(5),
    });
  }
}
