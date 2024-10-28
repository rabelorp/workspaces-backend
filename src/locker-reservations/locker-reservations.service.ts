import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateLockerReservationDto } from './dto/create-locker-reservation.dto';
import { UpdateLockerReservationDto } from './dto/update-locker-reservation.dto';
import { LockerReservationRepository } from './infrastructure/persistence/locker-reservation.abstract';
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
    @Inject(forwardRef(() => RabbitmqService))
    private readonly notificationService: RabbitmqService,
  ) {}

  async create(
    createLockerReservationDto: CreateLockerReservationDto,
    currentUser: any,
  ) {
    const currentUserId = currentUser.id;

    const { lockerId, reservationTime, reservationDate } =
      createLockerReservationDto;
    const existingReservation =
      await this.lockerReservationRepository.validateReservationAvailability(
        lockerId,
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

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    const [data, totalItems] =
      await this.lockerReservationRepository.findAllWithPagination({
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
    const removedNotification =
      await this.lockerReservationRepository.findById(id);
    await this.notificationService.handleNotification(
      removedNotification,
      ActionNotification.DELETE,
      EntityNotification.LOCKER_RESERVATION,
      currentUserId,
    );
    return await this.lockerReservationRepository.remove(id);
  }
}
