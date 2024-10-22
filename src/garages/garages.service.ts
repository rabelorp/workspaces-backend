import { Injectable } from '@nestjs/common';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';
import { GarageRepository } from './infrastructure/persistence/garage.abstract';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Garage } from './domain/garage';
import { GarageReservationsService } from 'src/garage-reservations/garage-reservations.service';
import { RabbitmqService } from '@queue/rabbitmq.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';

@Injectable()
export class GaragesService {
  constructor(
    private readonly garageRepository: GarageRepository,
    private readonly garageReservationService: GarageReservationsService,
    private readonly notificationService: RabbitmqService,
  ) {}

  async create(createGarageDto: CreateGarageDto, currentUser: any) {
    const currentUserId = currentUser.id;
    const garage = await this.garageRepository.create(createGarageDto);
    const created = await this.garageRepository.findById(garage.id);
    void this.notificationService.handleNotification(
      created,
      ActionNotification.CREATE,
      EntityNotification.GARAGE,
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
      await this.garageRepository.findAllWithPagination({
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

  findOne(id: Garage['id']) {
    return this.garageRepository.findById(id);
  }

  async update(
    id: Garage['id'],
    updateGarageDto: UpdateGarageDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;

    if (updateGarageDto.activate === false) {
      const hasReservations = await this.garageReservationService.findAll(id);

      if (hasReservations && hasReservations.length > 0) {
        for (const reservation of hasReservations) {
          void this.notificationService.handleNotification(
            reservation,
            ActionNotification.UPDATE,
            EntityNotification.GARAGE_RESERVATION,
            currentUserId,
            updateGarageDto.activate,
          );
        }
      }
    }

    void this.garageRepository.update(id, updateGarageDto);
    const updated = await this.garageRepository.findById(id);

    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.GARAGE,
      currentUserId,
    );

    return updated;
  }

  async remove(id: Garage['id'], currentUser: any) {
    const currentUserId = currentUser.id;
    const removed = await this.garageRepository.remove(id);
    void this.notificationService.handleNotification(
      removed,
      ActionNotification.DELETE,
      EntityNotification.GARAGE,
      currentUserId,
    );
    return removed;
  }
}
