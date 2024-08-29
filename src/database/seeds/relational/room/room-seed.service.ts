import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/room.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { RoomFactory } from './room.factory';

@Injectable()
export class RoomSeedService {
  constructor(
    @InjectRepository(RoomEntity)
    private repository: Repository<RoomEntity>,
    private roomFactory: RoomFactory,
  ) {}

  async run() {
    await this.repository.save(
      faker.helpers.multiple(this.roomFactory.createRandomRoom(), {
        count: 5,
      }),
    );
  }
}
