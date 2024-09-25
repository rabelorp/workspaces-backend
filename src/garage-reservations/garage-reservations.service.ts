import { Injectable } from '@nestjs/common';
import { CreateGarageReservationDto } from './dto/create-garage-reservation.dto';
import { UpdateGarageReservationDto } from './dto/update-garage-reservation.dto';
import { GarageReservationRepository } from './infrastructure/persistence/garage-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { GarageReservation } from './domain/garage-reservation';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { LocationsService } from 'src/locations/locations.service';
import { GaragesService } from 'src/garages/garages.service';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { RabbitmqService } from '@queue/rabbitmq.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';

@Injectable()
export class GarageReservationsService {
  constructor(
    private readonly garageReservationRepository: GarageReservationRepository,
    private mailService: MailService,
    private readonly userService: UsersService,
    private readonly garageService: GaragesService,
    private readonly locationService: LocationsService,
    private readonly notificationService: RabbitmqService,
  ) {}

  async create(createRoomReservationDto: CreateGarageReservationDto) {
    const garageReservation = await this.garageReservationRepository.create(
      createRoomReservationDto,
    );

    const admins = await this.userService.findByRole(1);
    const user = await this.userService.findById(garageReservation.userId);
    const garage = await this.garageService.findOne(garageReservation.garageId);

    const location = garage
      ? await this.locationService.findOne(garage.locationId)
      : null;

    for (const admin of admins) {
      if (admin.email) {
        await this.mailService.confirmReservation({
          to: admin.email,
          data: {
            fullNameAdmin: `${admin?.firstName} ${admin?.lastName}`,
            positionAdmin: admin.position,
            fullNameUser: `${user?.firstName} ${user?.lastName}`,
            roomId: garageReservation.garageId,
            roomName: garage?.garageName,
            roomLocation: location?.locationName,
            observation: garageReservation.observation,
            reservationDate: garageReservation.reservationDate,
            reservationTime: ReservationTime[garageReservation.reservationTime],
            admin: true,
          },
        });
      }
    }

    if (user?.email) {
      await this.mailService.confirmReservation({
        to: user.email,
        data: {
          fullNameAdmin: `Aquilino Santos`,
          positionAdmin: 'Analista Financeiro',
          fullNameUser: `${user?.firstName} ${user?.lastName}`,
          roomId: garageReservation.garageId,
          roomName: garage?.garageName,
          roomLocation: location?.locationName,
          observation: garageReservation.observation,
          reservationDate: garageReservation.reservationDate,
          reservationTime: ReservationTime[garageReservation.reservationTime],
        },
      });
    }

    return garageReservation;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.garageReservationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        filters: paginationOptions.filters,
      },
    });
  }

  findOne(id: GarageReservation['id']) {
    return this.garageReservationRepository.findById(id);
  }

  async update(
    id: GarageReservation['id'],
    updateGarageReservationDto: UpdateGarageReservationDto,
  ) {
    void this.garageReservationRepository.update(
      id,
      updateGarageReservationDto,
    );

    const updated = await this.garageReservationRepository.findById(id);

    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.GARAGE,
    );
    return updated;
  }

  remove(id: GarageReservation['id']) {
    const removed = this.garageReservationRepository.remove(id);
    void this.notificationService.handleNotification(
      removed,
      ActionNotification.DELETE,
      EntityNotification.GARAGE,
    );
    return removed;
  }
}
