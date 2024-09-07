import { Injectable } from '@nestjs/common';
import { CreateWorkStationReservationDto } from './dto/create-work-station-reservation.dto';
import { UpdateWorkStationReservationDto } from './dto/update-work-station-reservation.dto';
import { WorkStationReservationRepository } from './infrastructure/persistence/work-station-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { WorkStationReservation } from './domain/work-station-reservation';
import { MailService } from 'src/mail/mail.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import { WorkStationsService } from 'src/work-stations/work-stations.service';

@Injectable()
export class WorkStationReservationsService {
  constructor(
    private readonly workStationReservationRepository: WorkStationReservationRepository,
    private mailService: MailService,
    private readonly userService: UsersService,
    private readonly workStation: WorkStationsService,
  ) {}

  async create(
    createWorkStationReservationDto: CreateWorkStationReservationDto,
  ) {
    const workStationReservation =
      await this.workStationReservationRepository.create(
        createWorkStationReservationDto,
      );
    const admins = await this.userService.findByRole(1);
    const user = await this.userService.findById(workStationReservation.userId);
    const workStation = await this.workStation.findOne(
      workStationReservation.workstationId,
    );

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
            roomLocation: workStation?.locationId,
            observation: workStationReservation.observation,
            reservationDate: workStationReservation.reservationDate,
            reservationTime: workStationReservation.reservationTime,
          },
        });
      }
    }

    return workStationReservation;
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
      },
    });
  }

  findOne(id: WorkStationReservation['id']) {
    return this.workStationReservationRepository.findById(id);
  }

  update(
    id: WorkStationReservation['id'],
    updateWorkStationReservationDto: UpdateWorkStationReservationDto,
  ) {
    return this.workStationReservationRepository.update(
      id,
      updateWorkStationReservationDto,
    );
  }

  remove(id: WorkStationReservation['id']) {
    return this.workStationReservationRepository.remove(id);
  }
}
