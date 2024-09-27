import { Module } from '@nestjs/common';
import { LockersService } from './lockers.service';
import { LockersController } from './lockers.controller';
import { RelationalLockerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalLockerPersistenceModule],
  controllers: [LockersController],
  providers: [LockersService],
  exports: [LockersService, RelationalLockerPersistenceModule],
})
export class LockersModule {}
