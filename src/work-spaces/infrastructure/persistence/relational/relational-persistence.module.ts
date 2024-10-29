import { Module } from '@nestjs/common';
import { WorkSpacesRepository } from '../work-spaces.abstract';
import { WorkSpacesRelationalRepository } from './repositories/work-spaces.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkSpacesEntity } from './entities/work-spaces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkSpacesEntity])],
  providers: [
    {
      provide: WorkSpacesRepository,
      useClass: WorkSpacesRelationalRepository,
    },
  ],
  exports: [WorkSpacesRepository],
})
export class RelationalWorkSpacesPersistenceModule {}
