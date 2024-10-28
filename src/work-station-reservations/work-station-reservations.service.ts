import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateWorkStationReservationDto } from './dto/create-work-station-reservation.dto';
import { UpdateWorkStationReservationDto } from './dto/update-work-station-reservation.dto';
import { WorkStationReservationRepository } from './infrastructure/persistence/work-station-reservation.abstract';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { WorkStationReservation } from './domain/work-station-reservation';
import { RabbitmqService } from '@queue/rabbitmq.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';
import { LockerReservationsService } from 'src/locker-reservations/locker-reservations.service';

@Injectable()
export class WorkStationReservationsService {
  constructor(
    private readonly workStationReservationRepository: WorkStationReservationRepository,
    @Inject(forwardRef(() => RabbitmqService))
    private readonly notificationService: RabbitmqService,
    @Inject(forwardRef(() => LockerReservationsService))
    private readonly lockerReservationsService: LockerReservationsService,
  ) {}

  async create(
    createWorkStationReservationDto: CreateWorkStationReservationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;

    let createWorkStationReservationLockerDto: any = null;

    if (createWorkStationReservationDto.lockerId) {
      const lockerReservationDto: CreateLockerReservationDto = {
        ...createWorkStationReservationDto,
        lockerId: createWorkStationReservationDto.lockerId || '',
      };
      const lockerReservation = await this.lockerReservationsService.create(
        lockerReservationDto,
        currentUser,
      );
      createWorkStationReservationLockerDto = {
        ...createWorkStationReservationDto,
        lockerReservationId: lockerReservation?.id,
      };
    }

    const { workstationId, reservationTime, reservationDate } =
      createWorkStationReservationDto;
    const existingReservation =
      await this.workStationReservationRepository.validateReservationAvailability(
        workstationId,
        reservationTime,
        reservationDate,
      );
    if (existingReservation && existingReservation.length > 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          reservation: 'reservationAlreadyExists',
        },
      });
    }

    const workStationReservation =
      await this.workStationReservationRepository.create(
        createWorkStationReservationLockerDto ??
          createWorkStationReservationDto,
      );

    const created = await this.workStationReservationRepository.findById(
      workStationReservation.id,
    );
    void this.notificationService.handleNotification(
      created,
      ActionNotification.CREATE,
      EntityNotification.WORKSTATION_RESERVATION,
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
      await this.workStationReservationRepository.findAllWithPagination({
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

  findAll(id: WorkStationReservation['id']) {
    return this.workStationReservationRepository.findAll(id);
  }

  findOne(id: WorkStationReservation['id']) {
    return this.workStationReservationRepository.findById(id);
  }

  async update(
    id: WorkStationReservation['id'],
    updateWorkStationReservationDto: UpdateWorkStationReservationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;
    void (await this.workStationReservationRepository.update(
      id,
      updateWorkStationReservationDto,
    ));

    const updated = await this.workStationReservationRepository.findById(id);

    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.WORKSTATION_RESERVATION,
      currentUserId,
    );
    return updated;
  }

  async remove(id: WorkStationReservation['id'], currentUser: any) {
    const currentUserId = currentUser.id;
    const removedNotification =
      await this.workStationReservationRepository.findById(id);
    await this.notificationService.handleNotification(
      removedNotification,
      ActionNotification.DELETE,
      EntityNotification.WORKSTATION_RESERVATION,
      currentUserId,
    );
    return await this.workStationReservationRepository.remove(id);
  }
}
