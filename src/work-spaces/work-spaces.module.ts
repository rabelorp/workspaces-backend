import { Module } from '@nestjs/common';
import { WorkSpacesService } from './work-spaces.service';
import { WorkSpacesController } from './work-spaces.controller';
import { RelationalWorkSpacesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalWorkSpacesPersistenceModule],
  controllers: [WorkSpacesController],
  providers: [WorkSpacesService],
  exports: [WorkSpacesService, RelationalWorkSpacesPersistenceModule],
})
export class WorkSpacesModule {}
