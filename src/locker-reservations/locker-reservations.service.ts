import { Injectable } from '@nestjs/common';
import { CreateLockerReservationDto } from './dto/create-locker-reservation.dto';
import { UpdateLockerReservationDto } from './dto/update-locker-reservation.dto';
import { LockerReservationRepository } from './infrastructure/persistence/locker-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { LockerReservation } from './domain/locker-reservation';

@Injectable()
export class LockerReservationsService {
  constructor(
    private readonly lockerReservationRepository: LockerReservationRepository,
  ) {}

  create(createLockerReservationDto: CreateLockerReservationDto) {
    return this.lockerReservationRepository.create(createLockerReservationDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.lockerReservationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: LockerReservation['id']) {
    return this.lockerReservationRepository.findById(id);
  }

  update(
    id: LockerReservation['id'],
    updateLockerReservationDto: UpdateLockerReservationDto,
  ) {
    return this.lockerReservationRepository.update(
      id,
      updateLockerReservationDto,
    );
  }

  remove(id: LockerReservation['id']) {
    return this.lockerReservationRepository.remove(id);
  }
}
