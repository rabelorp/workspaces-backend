import { Injectable } from '@nestjs/common';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { UpdateCheckInDto } from './dto/update-check-in.dto';
import { CheckInRepository } from './infrastructure/persistence/check-in.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CheckIn } from './domain/check-in';
import { RabbitmqService } from '@queue/rabbitmq.service';
import { GarageReservationsService } from 'src/garage-reservations/garage-reservations.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';
import { UpdateGarageReservationDto } from 'src/garage-reservations/dto/update-garage-reservation.dto';

@Injectable()
export class CheckInsService {
  constructor(
    private readonly checkInRepository: CheckInRepository,
    private readonly notificationService: RabbitmqService,
    private readonly garageReservationService: GarageReservationsService,
  ) {}

  async create(createCheckInDto: CreateCheckInDto, currentUser: any) {
    const currentUserId = currentUser.id;
    let garageReservation: any = null;

    const checkIn = await this.checkInRepository.create(createCheckInDto);

    if (checkIn.reservationId) {
      const updateGarageReservationDto: UpdateGarageReservationDto = {
        checkInId: checkIn.id,
      };

      garageReservation = await this.garageReservationService.update(
        createCheckInDto.reservationId,
        updateGarageReservationDto,
        currentUserId,
      );
    }
    const created = await this.checkInRepository.findById(checkIn.id);

    void this.notificationService.handleNotification(
      { ...garageReservation, created },
      ActionNotification.CREATE,
      EntityNotification.CHECKIN,
      currentUserId,
    );
    return created;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.checkInRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: CheckIn['id']) {
    return this.checkInRepository.findById(id);
  }

  update(id: CheckIn['id'], updateCheckInDto: UpdateCheckInDto) {
    return this.checkInRepository.update(id, updateCheckInDto);
  }

  remove(id: CheckIn['id']) {
    return this.checkInRepository.remove(id);
  }
}
