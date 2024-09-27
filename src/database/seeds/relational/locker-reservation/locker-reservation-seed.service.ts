import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LockerReservationEntity } from '../../../../locker-reservations/infrastructure/persistence/relational/entities/locker-reservation.entity';
import { Repository } from 'typeorm';
import {
  NotificationData,
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { NotificationSeedService } from '../notification/notification-seed.service';
import { LockerReservationFactory } from './locker-reservation.factory';

@Injectable()
export class LockerReservationSeedService {
  constructor(
    @InjectRepository(LockerReservationEntity)
    private repository: Repository<LockerReservationEntity>,
    private lockerReservationFactory: LockerReservationFactory,
    private readonly notificationService: NotificationSeedService,
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
  ) {}

  async run() {
    const lockerReservation =
      await this.lockerReservationFactory.createRandomLockerReservation();

    const savedLockerReservation =
      await this.repository.save(lockerReservation);

    const existingUser = await this.repositoryUser.findOne({
      where: { id: savedLockerReservation.userId },
    });

    const notificationData: NotificationData = {
      userId: savedLockerReservation.userId,
      action: ActionNotification.CREATE,
      entity: EntityNotification.LOCKER,
      message: `O usuário: ${existingUser?.firstName} ${existingUser?.lastName} fez uma reserva na lockerm: ${savedLockerReservation.locker.location.locationName}-${savedLockerReservation.locker.lockerName}.`,
      createdAt: new Date(),
    };

    this.notificationService.createRandomNotification(notificationData);
  }
}
