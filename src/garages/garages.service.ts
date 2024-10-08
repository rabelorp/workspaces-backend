import { Injectable } from '@nestjs/common';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';
import { GarageRepository } from './infrastructure/persistence/garage.repository';
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

  create(createGarageDto: CreateGarageDto) {
    return this.garageRepository.create(createGarageDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.garageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        filters: paginationOptions.filters,
      },
    });
  }

  findOne(id: Garage['id']) {
    return this.garageRepository.findById(id);
  }

  async update(
    id: Garage['id'],
    updateGarageDto: UpdateGarageDto,
    currentUser?: any,
  ) {
    const currentUserId = currentUser?.id;

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

  remove(id: Garage['id']) {
    return this.garageRepository.remove(id);
  }
}
