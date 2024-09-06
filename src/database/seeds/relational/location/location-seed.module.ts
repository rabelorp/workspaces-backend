import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from '../../../../locations/infrastructure/persistence/relational/entities/location.entity';
import { LocationSeedService } from './location-seed.service';
import { LocationFactory } from './location.factory';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  providers: [LocationSeedService, LocationFactory],
  exports: [LocationSeedService, LocationFactory],
})
export class LocationSeedModule {}
