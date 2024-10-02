import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './infrastructure/persistence/room.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Room } from './domain/room';
import { RoomReservationsService } from 'src/room-reservations/room-reservations.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomReservationService: RoomReservationsService,
  ) {}

  create(createRoomDto: CreateRoomDto) {
    return this.roomRepository.create(createRoomDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.roomRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        filters: paginationOptions.filters,
      },
    });
  }

  findOne(id: Room['id']) {
    return this.roomRepository.findById(id);
  }

  async update(id: Room['id'], updateRoomDto: UpdateRoomDto) {
    if (updateRoomDto.activate === false) {
      const hasReservations = await this.roomReservationService.findOne(id);

      if (hasReservations) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            activate: 'Cannot deactivate garage with active reservations',
          },
        });
      }
    }
    return this.roomRepository.update(id, updateRoomDto);
  }

  remove(id: Room['id']) {
    return this.roomRepository.remove(id);
  }
}
