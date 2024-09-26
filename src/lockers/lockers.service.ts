import { Injectable } from '@nestjs/common';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto } from './dto/update-locker.dto';
import { LockerRepository } from './infrastructure/persistence/locker.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Locker } from './domain/locker';

@Injectable()
export class LockersService {
  constructor(private readonly lockerRepository: LockerRepository) {}

  create(createLockerDto: CreateLockerDto) {
    return this.lockerRepository.create(createLockerDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.lockerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Locker['id']) {
    return this.lockerRepository.findById(id);
  }

  update(id: Locker['id'], updateLockerDto: UpdateLockerDto) {
    return this.lockerRepository.update(id, updateLockerDto);
  }

  remove(id: Locker['id']) {
    return this.lockerRepository.remove(id);
  }
}
