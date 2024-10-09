import { forwardRef, Module } from '@nestjs/common';
import { LockersService } from './lockers.service';
import { LockersController } from './lockers.controller';
import { RelationalLockerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { LockerReservationsModule } from 'src/locker-reservations/locker-reservations.module';

@Module({
  imports: [
    RelationalLockerPersistenceModule,
    forwardRef(() => LockerReservationsModule),
  ],
  controllers: [LockersController],
  providers: [LockersService],
  exports: [LockersService, RelationalLockerPersistenceModule],
})
export class LockersModule {}
