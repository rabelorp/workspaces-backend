import { Injectable } from '@nestjs/common';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { UpdateCheckInDto } from './dto/update-check-in.dto';
import { CheckInRepository } from './infrastructure/persistence/check-in.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CheckIn } from './domain/check-in';
import { RabbitmqService } from '@queue/rabbitmq.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';

@Injectable()
export class CheckInsService {
  constructor(
    private readonly checkInRepository: CheckInRepository,
    private readonly notificationService: RabbitmqService,
  ) {}

  async create(createCheckInDto: CreateCheckInDto, currentUser: any) {
    const currentUserId = currentUser.id;

    const checkIn = await this.checkInRepository.create(createCheckInDto);

    const created = await this.checkInRepository.findById(checkIn.id);

    void this.notificationService.handleNotification(
      { id: checkIn.reservationId, checkInId: checkIn.id },
      ActionNotification.CREATE,
      EntityNotification.CHECKIN_RESERVATION,
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
