import { Injectable } from '@nestjs/common';
import { CreateLockerReservationDto } from './dto/create-locker-reservation.dto';
import { UpdateLockerReservationDto } from './dto/update-locker-reservation.dto';
import { LockerReservationRepository } from './infrastructure/persistence/locker-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { LockerReservation } from './domain/locker-reservation';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';
import { RabbitmqService } from '@queue/rabbitmq.service';

@Injectable()
export class LockerReservationsService {
  constructor(
    private readonly lockerReservationRepository: LockerReservationRepository,
    private readonly notificationService: RabbitmqService,
  ) {}

  async create(
    createLockerReservationDto: CreateLockerReservationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;
    const lockerReservation = await this.lockerReservationRepository.create(
      createLockerReservationDto,
    );

    const created = await this.lockerReservationRepository.findById(
      lockerReservation.id,
    );

    void this.notificationService.handleNotification(
      created,
      ActionNotification.CREATE,
      EntityNotification.LOCKER_RESERVATION,
      currentUserId,
    );
    return created;
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

  findAll(id: LockerReservation['id']) {
    return this.lockerReservationRepository.findAll(id);
  }

  findOne(id: LockerReservation['id']) {
    return this.lockerReservationRepository.findById(id);
  }

  async update(
    id: LockerReservation['id'],
    updateLockerReservationDto: UpdateLockerReservationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;

    void (await this.lockerReservationRepository.update(
      id,
      updateLockerReservationDto,
    ));

    const updated = await this.lockerReservationRepository.findById(id);
    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.LOCKER_RESERVATION,
      currentUserId,
    );
    return updated;
  }

  async remove(id: LockerReservation['id'], currentUser: any) {
    const currentUserId = currentUser.id;
    const removed = await this.lockerReservationRepository.remove(id);
    void this.notificationService.handleNotification(
      removed,
      ActionNotification.DELETE,
      EntityNotification.LOCKER_RESERVATION,
      currentUserId,
    );
    return removed;
  }
}
