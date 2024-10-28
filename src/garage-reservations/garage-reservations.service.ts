import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateGarageReservationDto } from './dto/create-garage-reservation.dto';
import { UpdateGarageReservationDto } from './dto/update-garage-reservation.dto';
import { GarageReservationRepository } from './infrastructure/persistence/garage-reservation.abstract';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { GarageReservation } from './domain/garage-reservation';
import { RabbitmqService } from '@queue/rabbitmq.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';
import { LockerReservationsService } from 'src/locker-reservations/locker-reservations.service';
import { CreateLockerReservationDto } from 'src/locker-reservations/dto/create-locker-reservation.dto';

@Injectable()
export class GarageReservationsService {
  constructor(
    private readonly garageReservationRepository: GarageReservationRepository,
    private readonly notificationService: RabbitmqService,
    private readonly lockerReservationsService: LockerReservationsService,
  ) {}

  async create(
    createGarageReservationDto: CreateGarageReservationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;
    let createGarageReservationLockerDto: any = null;

    if (createGarageReservationDto.lockerId) {
      const lockerReservationDto: CreateLockerReservationDto = {
        ...createGarageReservationDto,
        lockerId: createGarageReservationDto.lockerId || '',
      };
      const lockerReservation = await this.lockerReservationsService.create(
        lockerReservationDto,
        currentUser,
      );
      createGarageReservationLockerDto = {
        ...createGarageReservationDto,
        lockerReservationId: lockerReservation?.id,
      };
    }

    const { garageId, reservationTime, reservationDate } =
      createGarageReservationDto;
    const existingReservation =
      await this.garageReservationRepository.validateReservationAvailability(
        garageId,
        reservationTime,
        reservationDate,
      );
    if (existingReservation) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          reservation: 'reservationAlreadyExists',
        },
      });
    }

    const garageReservation = await this.garageReservationRepository.create(
      createGarageReservationLockerDto ?? createGarageReservationDto,
    );

    const created = await this.garageReservationRepository.findById(
      garageReservation.id,
    );
    void this.notificationService.handleNotification(
      created,
      ActionNotification.CREATE,
      EntityNotification.GARAGE_RESERVATION,
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
      await this.garageReservationRepository.findAllWithPagination({
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

  findAll(id: GarageReservation['id']) {
    return this.garageReservationRepository.findAll(id);
  }

  findOne(id: GarageReservation['id']) {
    return this.garageReservationRepository.findById(id);
  }

  async update(
    id: GarageReservation['id'],
    updateGarageReservationDto: UpdateGarageReservationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;
    void (await this.garageReservationRepository.update(
      id,
      updateGarageReservationDto,
    ));

    const updated = await this.garageReservationRepository.findById(id);

    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.GARAGE_RESERVATION,
      currentUserId,
    );

    return updated;
  }

  async remove(id: GarageReservation['id'], currentUser: any) {
    const currentUserId = currentUser.id;
    const removedNotification =
      await this.garageReservationRepository.findById(id);
    await this.notificationService.handleNotification(
      removedNotification,
      ActionNotification.DELETE,
      EntityNotification.GARAGE_RESERVATION,
      currentUserId,
    );
    return await this.garageReservationRepository.remove(id);
  }
}
