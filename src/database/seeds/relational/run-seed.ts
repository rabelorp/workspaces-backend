import { NestFactory } from '@nestjs/core';
import { LockerReservationSeedService } from './locker-reservation/locker-reservation-seed.service';
import { LockerSeedService } from './locker/locker-seed.service';
import { NotificationSeedService } from './notification/notification-seed.service';
import { GarageReservationSeedService } from './garage-reservation/garage-reservation-seed.service';
import { GarageSeedService } from './garage/garage-seed.service';
import { LocationSeedService } from './location/location-seed.service';
import { RoomSeedService } from './room/room-seed.service';
import { RoomReservationSeedService } from './room-reservation/room-reservation-seed.service';
import { WorkStationReservationSeedService } from './work-station-reservation/work-station-reservation-seed.service';
import { WorkStationSeedService } from './work-station/work-station-seed.service';

import { SeedModule } from './seed.module';
import { UserSeedService } from './user/user-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { StatusSeedService } from './status/status-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();

  await app.get(LocationSeedService).run();

  await app.get(WorkStationSeedService).run();

  await app.get(WorkStationReservationSeedService).run();

  await app.get(RoomSeedService).run();

  await app.get(RoomReservationSeedService).run();

  await app.get(GarageSeedService).run();

  await app.get(GarageReservationSeedService).run();

  await app.get(NotificationSeedService).run();

  await app.get(LockerSeedService).run();

  await app.get(LockerReservationSeedService).run();

  await app.close();
};

void runSeed();
