import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRoomReservationDto } from './dto/create-room-reservation.dto';
import { UpdateRoomReservationDto } from './dto/update-room-reservation.dto';
import { RoomReservationRepository } from './infrastructure/persistence/room-reservation.abstract';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RoomReservation } from './domain/room-reservation';
import { RabbitmqService } from '@queue/rabbitmq.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';
import { LockerReservationsService } from 'src/locker-reservations/locker-reservations.service';

@Injectable()
export class RoomReservationsService {
  constructor(
    private readonly roomReservationRepository: RoomReservationRepository,
    @Inject(forwardRef(() => RabbitmqService))
    private readonly notificationService: RabbitmqService,
    @Inject(forwardRef(() => LockerReservationsService))
    private readonly lockerReservationsService: LockerReservationsService,
  ) {}
  async create(
    createRoomReservationDto: CreateRoomReservationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;

    let createRoomReservationLockerDto: any = null;

    if (createRoomReservationDto.lockerId) {
      const lockerReservationDto: CreateLockerReservationDto = {
        ...createRoomReservationDto,
        lockerId: createRoomReservationDto.lockerId || '',
      };
      const lockerReservation = await this.lockerReservationsService.create(
        lockerReservationDto,
        currentUser,
      );

      createRoomReservationLockerDto = {
        ...createRoomReservationDto,
        lockerReservationId: lockerReservation?.id,
      };
    }

    const roomReservation = await this.roomReservationRepository.create(
      createRoomReservationLockerDto ?? createRoomReservationDto,
    );

    const created = await this.roomReservationRepository.findById(
      roomReservation.id,
    );
    void this.notificationService.handleNotification(
      created,
      ActionNotification.CREATE,
      EntityNotification.ROOM_RESERVATION,
      currentUserId,
    );
    return created;
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    const [data, totalItems] =
      await this.roomReservationRepository.findAllWithPagination({
        paginationOptions: {
          page: paginationOptions.page,
          limit: paginationOptions.limit,
          filters: paginationOptions.filters,
        },
      });
    return {
      data,
      totalItems,
    };
  }

  findAll(id: RoomReservation['id']) {
    return this.roomReservationRepository.findAll(id);
  }

  findOne(id: RoomReservation['id']) {
    return this.roomReservationRepository.findById(id);
  }

  async update(
    id: RoomReservation['id'],
    updateRoomReservationDto: UpdateRoomReservationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;
    void (await this.roomReservationRepository.update(
      id,
      updateRoomReservationDto,
    ));
    const updated = await this.roomReservationRepository.findById(id);
    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.ROOM_RESERVATION,
      currentUserId,
    );
    return updated;
  }

  async remove(id: RoomReservation['id'], currentUser: any) {
    const currentUserId = currentUser.id;
    const removed = await this.roomReservationRepository.remove(id);
    void this.notificationService.handleNotification(
      removed,
      ActionNotification.DELETE,
      EntityNotification.ROOM_RESERVATION,
      currentUserId,
    );
    return removed;
  }
}
