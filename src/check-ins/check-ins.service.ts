import { Injectable } from '@nestjs/common';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { UpdateCheckInDto } from './dto/update-check-in.dto';
import { CheckInRepository } from './infrastructure/persistence/check-in.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CheckIn } from './domain/check-in';

@Injectable()
export class CheckInsService {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  create(createCheckInDto: CreateCheckInDto) {
    return this.checkInRepository.create(createCheckInDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.checkInRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: CheckIn['id']) {
    return this.checkInRepository.findById(id);
  }

  update(id: CheckIn['id'], updateCheckInDto: UpdateCheckInDto) {
    return this.checkInRepository.update(id, updateCheckInDto);
  }

  remove(id: CheckIn['id']) {
    return this.checkInRepository.remove(id);
  }
}
