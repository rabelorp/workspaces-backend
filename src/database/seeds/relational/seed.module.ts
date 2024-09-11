import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from '../../typeorm-config.service';
import { RoleSeedModule } from './role/role-seed.module';
import { StatusSeedModule } from './status/status-seed.module';
import { UserSeedModule } from './user/user-seed.module';
import databaseConfig from '../../config/database.config';
import appConfig from '../../../config/app.config';

import { WorkStationSeedModule } from './work-station/work-station-seed.module';

import { WorkStationReservationSeedModule } from './work-station-reservation/work-station-reservation-seed.module';

import { RoomReservationSeedModule } from './room-reservation/room-reservation-seed.module';

import { RoomSeedModule } from './room/room-seed.module';

import { LocationSeedModule } from './location/location-seed.module';

import { GarageSeedModule } from './garage/garage-seed.module';

import { GarageReservationSeedModule } from './garage-reservation/garage-reservation-seed.module';

@Module({
  imports: [
    GarageReservationSeedModule,
    GarageSeedModule,
    LocationSeedModule,
    RoomSeedModule,
    RoomReservationSeedModule,
    WorkStationReservationSeedModule,
    RoleSeedModule,
    StatusSeedModule,
    UserSeedModule,
    WorkStationSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
