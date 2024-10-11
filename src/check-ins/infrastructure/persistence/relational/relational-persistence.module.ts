import { Module } from '@nestjs/common';
import { CheckInRepository } from '../check-in.repository';
import { CheckInRelationalRepository } from './repositories/check-in.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInEntity } from './entities/check-in.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckInEntity])],
  providers: [
    {
      provide: CheckInRepository,
      useClass: CheckInRelationalRepository,
    },
  ],
  exports: [CheckInRepository],
})
export class RelationalCheckInPersistenceModule {}
