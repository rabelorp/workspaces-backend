import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateWorkStationDto } from './dto/create-work-station.dto';
import { UpdateWorkStationDto } from './dto/update-work-station.dto';
import { WorkStationRepository } from './infrastructure/persistence/work-station.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { WorkStation } from './domain/work-station';
import { WorkStationReservationsService } from 'src/work-station-reservations/work-station-reservations.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';
import { RabbitmqService } from '@queue/rabbitmq.service';

@Injectable()
export class WorkStationsService {
  constructor(
    private readonly workStationRepository: WorkStationRepository,
    private readonly workStationReservationService: WorkStationReservationsService,
    @Inject(forwardRef(() => RabbitmqService))
    private readonly notificationService: RabbitmqService,
  ) {}

  async create(createWorkStationDto: CreateWorkStationDto, currentUser: any) {
    const currentUserId = currentUser.id;
    const garage =
      await this.workStationRepository.create(createWorkStationDto);
    const created = await this.workStationRepository.findById(garage.id);
    void this.notificationService.handleNotification(
      created,
      ActionNotification.CREATE,
      EntityNotification.WORKSTATION,
      currentUserId,
    );
    return created;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.workStationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        filters: paginationOptions.filters,
      },
    });
  }

  findOne(id: WorkStation['id']) {
    return this.workStationRepository.findById(id);
  }

  async update(
    id: WorkStation['id'],
    updateWorkStationDto: UpdateWorkStationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;

    if (updateWorkStationDto.activate === false) {
      const hasReservations =
        await this.workStationReservationService.findAll(id);

      if (hasReservations && hasReservations.length > 0) {
        for (const reservation of hasReservations) {
          void this.notificationService.handleNotification(
            reservation,
            ActionNotification.UPDATE,
            EntityNotification.WORKSTATION_RESERVATION,
            currentUserId,
            updateWorkStationDto.activate,
          );
        }
      }
    }

    void this.workStationRepository.update(id, updateWorkStationDto);
    const updated = await this.workStationRepository.findById(id);

    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.WORKSTATION,
      currentUserId,
    );

    return updated;
  }

  async remove(id: WorkStation['id'], currentUser: any) {
    const currentUserId = currentUser.id;
    const removed = await this.workStationRepository.remove(id);
    void this.notificationService.handleNotification(
      removed,
      ActionNotification.DELETE,
      EntityNotification.WORKSTATION,
      currentUserId,
    );
    return removed;
  }
}
