import { Module } from '@nestjs/common';
import { LockerRepository } from '../locker.repository';
import { LockerRelationalRepository } from './repositories/locker.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerEntity } from './entities/locker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LockerEntity])],
  providers: [
    {
      provide: LockerRepository,
      useClass: LockerRelationalRepository,
    },
  ],
  exports: [LockerRepository],
})
export class RelationalLockerPersistenceModule {}
