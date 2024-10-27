import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto } from './dto/update-locker.dto';
import { LockerRepository } from './infrastructure/persistence/locker.abstract';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Locker } from './domain/locker';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';
import { RabbitmqService } from '@queue/rabbitmq.service';
import { LockerReservationsService } from 'src/locker-reservations/locker-reservations.service';

@Injectable()
export class LockersService {
  constructor(
    private readonly lockerRepository: LockerRepository,
    private readonly lockerReservationService: LockerReservationsService,
    @Inject(forwardRef(() => RabbitmqService))
    private readonly notificationService: RabbitmqService,
  ) {}

  async create(createLockerDto: CreateLockerDto, currentUser: any) {
    const currentUserId = currentUser.id;
    const locker = await this.lockerRepository.create(createLockerDto);
    const created = await this.lockerRepository.findById(locker.id);
    void this.notificationService.handleNotification(
      created,
      ActionNotification.CREATE,
      EntityNotification.LOCKER,
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
      await this.lockerRepository.findAllWithPagination({
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

  findOne(id: Locker['id']) {
    return this.lockerRepository.findById(id);
  }

  async update(
    id: Locker['id'],
    updateLockerDto: UpdateLockerDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;

    if (updateLockerDto.activate === false) {
      const hasReservations = await this.lockerReservationService.findAll(id);

      if (hasReservations && hasReservations.length > 0) {
        for (const reservation of hasReservations) {
          void this.notificationService.handleNotification(
            reservation,
            ActionNotification.UPDATE,
            EntityNotification.LOCKER_RESERVATION,
            currentUserId,
            updateLockerDto.activate,
          );
        }
      }
    }

    void this.lockerRepository.update(id, updateLockerDto);
    const updated = await this.lockerRepository.findById(id);

    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.LOCKER,
      currentUserId,
    );

    return updated;
  }

  async remove(id: Locker['id'], currentUser: any) {
    const currentUserId = currentUser.id;
    const removedNotification = await this.lockerRepository.findById(id);
    await this.notificationService.handleNotification(
      removedNotification,
      ActionNotification.DELETE,
      EntityNotification.LOCKER,
      currentUserId,
    );
    return await this.lockerRepository.remove(id);
  }
}
