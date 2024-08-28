import { Injectable } from '@nestjs/common';
import { CreateRoomReservationDto } from './dto/create-room-reservation.dto';
import { UpdateRoomReservationDto } from './dto/update-room-reservation.dto';
import { RoomReservationRepository } from './infrastructure/persistence/room-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RoomReservation } from './domain/room-reservation';

@Injectable()
export class RoomReservationsService {
  constructor(
    private readonly roomReservationRepository: RoomReservationRepository,
  ) {}

  create(createRoomReservationDto: CreateRoomReservationDto) {
    return this.roomReservationRepository.create(createRoomReservationDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.roomReservationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: RoomReservation['id']) {
    return this.roomReservationRepository.findById(id);
  }

  update(
    id: RoomReservation['id'],
    updateRoomReservationDto: UpdateRoomReservationDto,
  ) {
    return this.roomReservationRepository.update(id, updateRoomReservationDto);
  }

  remove(id: RoomReservation['id']) {
    return this.roomReservationRepository.remove(id);
  }
}
