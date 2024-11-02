import { Module } from '@nestjs/common';
import { WorkSpacesRepository } from '../work-spaces.abstract';
import { WorkSpacesRelationalRepository } from './repositories/work-spaces.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkSpacesEntity } from './entities/work-spaces.entity';
import { RoomRepository } from 'src/rooms/infrastructure/persistence/room.abstract';
import { RoomRelationalRepository } from 'src/rooms/infrastructure/persistence/relational/repositories/room.repository';
import { RoomEntity } from 'src/rooms/infrastructure/persistence/relational/entities/room.entity';
import { WorkStationRepository } from 'src/work-stations/infrastructure/persistence/work-station.abstract';
import { WorkStationRelationalRepository } from 'src/work-stations/infrastructure/persistence/relational/repositories/work-station.repository';
import { WorkStationEntity } from 'src/work-stations/infrastructure/persistence/relational/entities/work-station.entity';
import { GarageRelationalRepository } from 'src/garages/infrastructure/persistence/relational/repositories/garage.repository';
import { GarageRepository } from 'src/garages/infrastructure/persistence/garage.abstract';
import { GarageEntity } from 'src/garages/infrastructure/persistence/relational/entities/garage.entity';
import { LockerRepository } from 'src/lockers/infrastructure/persistence/locker.abstract';
import { LockerRelationalRepository } from 'src/lockers/infrastructure/persistence/relational/repositories/locker.repository';
import { LockerEntity } from 'src/lockers/infrastructure/persistence/relational/entities/locker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkSpacesEntity,
      RoomEntity,
      WorkStationEntity,
      GarageEntity,
      LockerEntity,
    ]),
  ],
  providers: [
    {
      provide: WorkSpacesRepository,
      useClass: WorkSpacesRelationalRepository,
    },
    {
      provide: RoomRepository,
      useClass: RoomRelationalRepository,
    },
    {
      provide: WorkStationRepository,
      useClass: WorkStationRelationalRepository,
    },
    {
      provide: GarageRepository,
      useClass: GarageRelationalRepository,
    },
    {
      provide: LockerRepository,
      useClass: LockerRelationalRepository,
    },
  ],
  exports: [WorkSpacesRepository],
})
export class RelationalWorkSpacesPersistenceModule {}
