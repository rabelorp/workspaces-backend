import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/room.entity';

@Injectable()
export class RoomFactory {
  constructor(
    @InjectRepository(RoomEntity)
    private repositoryRoom: Repository<RoomEntity>,
  ) {}

  createRandomRoom() {
    // Need for saving "this" context
    return () => {
      return this.repositoryRoom.create({
        roomName: faker.company.name(),
        location: faker.location.city(),
        capacity: faker.number.int({ min: 3, max: 10 }),
        exclusive: 'GTH',
        photoId: '',
      });
    };
  }
}
