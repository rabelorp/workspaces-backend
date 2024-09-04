import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { RelationalLocationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalLocationPersistenceModule],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService, RelationalLocationPersistenceModule],
})
export class LocationsModule {}
