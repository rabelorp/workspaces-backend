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

  async create(createLockerReservationDto: CreateLockerReservationDto) {
    const lockerReservation = await this.lockerReservationRepository.create(
      createLockerReservationDto,
    );

    const created = await this.lockerReservationRepository.findById(
      lockerReservation.id,
    );
    console.log('ffffffffffffffffffffffff');
    console.log(created);
    void this.notificationService.handleNotification(
      created,
      ActionNotification.CREATE,
      EntityNotification.LOCKER,
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

  findOne(id: LockerReservation['id']) {
    return this.lockerReservationRepository.findById(id);
  }

  async update(
    id: LockerReservation['id'],
    updateLockerReservationDto: UpdateLockerReservationDto,
  ) {
    void (await this.lockerReservationRepository.update(
      id,
      updateLockerReservationDto,
    ));

    const updated = await this.lockerReservationRepository.findById(id);
    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.LOCKER,
    );
    return updated;
  }

  remove(id: LockerReservation['id']) {
    const removed = this.lockerReservationRepository.remove(id);
    void this.notificationService.handleNotification(
      removed,
      ActionNotification.DELETE,
      EntityNotification.LOCKER,
    );
    return removed;
  }
}
