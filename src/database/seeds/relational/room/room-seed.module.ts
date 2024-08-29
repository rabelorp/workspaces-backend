import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from '../../../../rooms/infrastructure/persistence/relational/entities/room.entity';
import { RoomSeedService } from './room-seed.service';
import { RoomFactory } from './room.factory';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  providers: [RoomSeedService, RoomFactory],
  exports: [RoomSeedService, RoomFactory, TypeOrmModule],
})
export class RoomSeedModule {}
