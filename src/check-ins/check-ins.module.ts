import { Module } from '@nestjs/common';
import { CheckInsService } from './check-ins.service';
import { CheckInsController } from './check-ins.controller';
import { RelationalCheckInPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalCheckInPersistenceModule],
  controllers: [CheckInsController],
  providers: [CheckInsService],
  exports: [CheckInsService, RelationalCheckInPersistenceModule],
})
export class CheckInsModule {}
