import { Module } from '@nestjs/common';
import { GaragesService } from './garages.service';
import { GaragesController } from './garages.controller';
import { RelationalGaragePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalGaragePersistenceModule],
  controllers: [GaragesController],
  providers: [GaragesService],
  exports: [GaragesService, RelationalGaragePersistenceModule],
})
export class GaragesModule {}
