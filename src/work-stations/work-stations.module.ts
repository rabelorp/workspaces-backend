import { Module } from '@nestjs/common';
import { WorkStationsService } from './work-stations.service';
import { WorkStationsController } from './work-stations.controller';
import { RelationalWorkStationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalWorkStationPersistenceModule],
  controllers: [WorkStationsController],
  providers: [WorkStationsService],
  exports: [WorkStationsService, RelationalWorkStationPersistenceModule],
})
export class WorkStationsModule {}
