import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GarageReservationEntity } from '../../../../garage-reservations/infrastructure/persistence/relational/entities/garage-reservation.entity';
import { Repository } from 'typeorm';
import { GarageReservationFactory } from './garage-reservation.factory';
import { NotificationSeedService } from '../notification/notification-seed.service';
import {
  ActionNotification,
  EntityNotification,
  NotificationData,
} from '@interfaces/notifications.interface';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class GarageReservationSeedService {
  constructor(
    @InjectRepository(GarageReservationEntity)
    private repository: Repository<GarageReservationEntity>,
    private garageReservationFactory: GarageReservationFactory,
    private readonly notificationService: NotificationSeedService,
    @InjectRepository(UserEntity)
    private repositoryUser: Repository<UserEntity>,
  ) {}

  async run() {
    const garageReservation =
      await this.garageReservationFactory.createRandomGarageReservation();

    const savedGarageReservation =
      await this.repository.save(garageReservation);

    const existingUser = await this.repositoryUser.findOne({
      where: { id: savedGarageReservation.userId },
    });

    const notificationData: NotificationData = {
      userId: savedGarageReservation.userId,
      action: ActionNotification.CREATE,
      entity: EntityNotification.GARAGE,
      message: `O usuário: ${existingUser?.firstName} ${existingUser?.lastName} fez uma reserva na garagem: ${savedGarageReservation.garage.location.locationName}-${savedGarageReservation.garage.garageName}.`,
      createdAt: new Date(),
    };

    this.notificationService.createRandomNotification(notificationData);
  }
}
