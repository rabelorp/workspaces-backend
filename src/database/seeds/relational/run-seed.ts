import { NestFactory } from '@nestjs/core';
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

  await app.get(WorkStationSeedService).run();

  await app.get(WorkStationReservationSeedService).run();

  await app.get(RoomSeedService).run();

  await app.get(RoomReservationSeedService).run();

  await app.close();
};

void runSeed();
