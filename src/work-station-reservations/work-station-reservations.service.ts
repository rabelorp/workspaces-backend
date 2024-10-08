import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateWorkStationReservationDto } from './dto/create-work-station-reservation.dto';
import { UpdateWorkStationReservationDto } from './dto/update-work-station-reservation.dto';
import { WorkStationReservationRepository } from './infrastructure/persistence/work-station-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { WorkStationReservation } from './domain/work-station-reservation';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { WorkStationsService } from 'src/work-stations/work-stations.service';
import { LocationsService } from 'src/locations/locations.service';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { RabbitmqService } from '@queue/rabbitmq.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';

@Injectable()
export class WorkStationReservationsService {
  constructor(
    private readonly workStationReservationRepository: WorkStationReservationRepository,
    private mailService: MailService,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => WorkStationsService))
    private readonly workStation: WorkStationsService,
    private readonly locationService: LocationsService,
    private readonly notificationService: RabbitmqService,
  ) {}

  async create(
    createWorkStationReservationDto: CreateWorkStationReservationDto,
    currentUser?: any,
  ) {
    const currentUserId = currentUser?.id;
    const workStationReservation =
      await this.workStationReservationRepository.create(
        createWorkStationReservationDto,
      );
    const admins = await this.userService.findByRole(1);
    const user = await this.userService.findById(workStationReservation.userId);
    const workStation = await this.workStation.findOne(
      workStationReservation.workstationId,
    );

    const location = workStation
      ? await this.locationService.findOne(workStation.locationId)
      : null;

    for (const admin of admins) {
      if (admin.email) {
        await this.mailService.confirmReservation({
          to: admin.email,
          data: {
            fullNameAdmin: `${admin?.firstName} ${admin?.lastName}`,
            positionAdmin: admin.position,
            fullNameUser: `${user?.firstName} ${user?.lastName}`,
            roomId: workStationReservation.workstationId,
            roomName: workStation?.stationName,
            roomLocation: location?.locationName,
            observation: workStationReservation.observation,
            reservationDate: workStationReservation.reservationDate,
            reservationTime:
              ReservationTime[workStationReservation.reservationTime],
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
          roomId: workStationReservation.workstationId,
          roomName: workStation?.stationName,
          roomLocation: location?.locationName,
          observation: workStationReservation.observation,
          reservationDate: workStationReservation.reservationDate,
          reservationTime:
            ReservationTime[workStationReservation.reservationTime],
        },
      });
    }

    const updated = await this.workStationReservationRepository.findById(
      workStationReservation.id,
    );
    void this.notificationService.handleNotification(
      updated,
      ActionNotification.CREATE,
      EntityNotification.WORKSTATION_RESERVATION,
      currentUserId,
    );
    return updated;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.workStationReservationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        filters: paginationOptions.filters,
      },
    });
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
    currentUser?: any,
  ) {
    const currentUserId = currentUser?.id;
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

  async remove(id: WorkStationReservation['id'], currentUser?: any) {
    const currentUserId = currentUser?.id;
    const removed = await this.workStationReservationRepository.remove(id);
    void this.notificationService.handleNotification(
      removed,
      ActionNotification.DELETE,
      EntityNotification.WORKSTATION_RESERVATION,
      currentUserId,
    );
    return removed;
  }
}
