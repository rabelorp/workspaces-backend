import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarageEntity } from '../../../../garages/infrastructure/persistence/relational/entities/garage.entity';
import { GarageSeedService } from './garage-seed.service';
import { LocationEntity } from 'src/locations/infrastructure/persistence/relational/entities/location.entity';
import { GarageFactory } from './garage.factory';

@Module({
  imports: [TypeOrmModule.forFeature([GarageEntity, LocationEntity])],
  providers: [GarageSeedService, GarageFactory],
  exports: [GarageSeedService, GarageFactory],
})
export class GarageSeedModule {}
