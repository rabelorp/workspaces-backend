import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/room.entity';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { ExclusiveRoomType } from 'src/interfaces/exclusive-room.enum';

@Injectable()
export class RoomFactory {
  constructor(
    @InjectRepository(RoomEntity)
    private repositoryRoom: Repository<RoomEntity>,
    @InjectRepository(LocationEntity)
    private repositoryLocation: Repository<LocationEntity>,
  ) {}

  getRandomExclusiveRoomType(): ExclusiveRoomType {
    const exclusiveRoomType = Object.values(ExclusiveRoomType);
    return faker.helpers.arrayElement(exclusiveRoomType);
  }

  async createRandomRoom() {
    const location = await this.repositoryLocation.findOne({ where: {} });

    return () => {
      return this.repositoryRoom.create({
        roomName: faker.company.name(),
        locationId: location?.id,
        capacity: faker.number.int({ min: 3, max: 10 }),
        exclusive: this.getRandomExclusiveRoomType(),
        photoId: faker.image.url(),
      });
    };
  }
}
