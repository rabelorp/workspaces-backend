import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './infrastructure/persistence/room.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Room } from './domain/room';
import { RoomReservationsService } from 'src/room-reservations/room-reservations.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';
import { RabbitmqService } from '@queue/rabbitmq.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomReservationService: RoomReservationsService,
    @Inject(forwardRef(() => RabbitmqService))
    private readonly notificationService: RabbitmqService,
  ) {}

  async create(createRoomDto: CreateRoomDto, currentUser: any) {
    const currentUserId = currentUser.id;
    const garage = await this.roomRepository.create(createRoomDto);
    const create = await this.roomRepository.findById(garage.id);
    void this.notificationService.handleNotification(
      create,
      ActionNotification.CREATE,
      EntityNotification.ROOM,
      currentUserId,
    );
    return create;
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

  async update(id: Room['id'], updateRoomDto: UpdateRoomDto, currentUser: any) {
    const currentUserId = currentUser.id;

    if (updateRoomDto.activate === false) {
      const hasReservations = await this.roomReservationService.findAll(id);

      if (hasReservations && hasReservations.length > 0) {
        for (const reservation of hasReservations) {
          void this.notificationService.handleNotification(
            reservation,
            ActionNotification.UPDATE,
            EntityNotification.ROOM_RESERVATION,
            currentUserId,
            updateRoomDto.activate,
          );
        }
      }
    }

    void this.roomRepository.update(id, updateRoomDto);
    const updated = await this.roomRepository.findById(id);

    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.ROOM,
      currentUserId,
    );

    return updated;
  }

  async remove(id: Room['id'], currentUser: any) {
    const currentUserId = currentUser.id;
    const removed = await this.roomRepository.remove(id);
    void this.notificationService.handleNotification(
      removed,
      ActionNotification.DELETE,
      EntityNotification.ROOM,
      currentUserId,
    );
    return removed;
  }
}
