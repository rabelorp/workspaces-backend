import { Module } from '@nestjs/common';
import { GarageRepository } from '../garage.abstract';
import { GarageRelationalRepository } from './repositories/garage.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarageEntity } from './entities/garage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GarageEntity])],
  providers: [
    {
      provide: GarageRepository,
      useClass: GarageRelationalRepository,
    },
  ],
  exports: [GarageRepository],
})
export class RelationalGaragePersistenceModule {}
