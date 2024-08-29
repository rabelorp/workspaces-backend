import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomReservationEntity } from '../../../../room-reservations/infrastructure/persistence/relational/entities/room-reservation.entity';
import { Repository } from 'typeorm';
import { RoomReservationFactory } from './room-reservation.factory';

@Injectable()
export class RoomReservationSeedService {
  constructor(
    @InjectRepository(RoomReservationEntity)
    private repository: Repository<RoomReservationEntity>,
    private roomReservationFactory: RoomReservationFactory,
  ) {}

  async run() {
    const roomReservation =
      await this.roomReservationFactory.createRandomRoomReservation();
    await this.repository.save(roomReservation);
  }
}
