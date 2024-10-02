import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRoomReservationDto } from './dto/create-room-reservation.dto';
import { UpdateRoomReservationDto } from './dto/update-room-reservation.dto';
import { RoomReservationRepository } from './infrastructure/persistence/room-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RoomReservation } from './domain/room-reservation';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { LocationsService } from 'src/locations/locations.service';
import { ReservationTime } from 'src/interfaces/reservation-time.enum';
import { RabbitmqService } from '@queue/rabbitmq.service';
import {
  ActionNotification,
  EntityNotification,
} from '@interfaces/notifications.interface';

@Injectable()
export class RoomReservationsService {
  constructor(
    private readonly roomReservationRepository: RoomReservationRepository,
    private mailService: MailService,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => RoomsService))
    private readonly roomService: RoomsService,
    private readonly locationService: LocationsService,
    @Inject(forwardRef(() => RabbitmqService))
    private readonly notificationService: RabbitmqService,
  ) {}
  async create(createRoomReservationDto: CreateRoomReservationDto) {
    const roomReservation = await this.roomReservationRepository.create(
      createRoomReservationDto,
    );

    const admins = await this.userService.findByRole(1);
    const user = await this.userService.findById(roomReservation.userId);
    const room = await this.roomService.findOne(roomReservation.roomId);

    const location = room
      ? await this.locationService.findOne(room.locationId)
      : null;

    for (const admin of admins) {
      if (admin.email) {
        await this.mailService.confirmReservation({
          to: admin.email,
          data: {
            fullNameAdmin: `${admin?.firstName} ${admin?.lastName}`,
            positionAdmin: admin.position,
            fullNameUser: `${user?.firstName} ${user?.lastName}`,
            roomId: roomReservation.roomId,
            roomName: room?.roomName,
            roomLocation: location?.locationName,
            observation: roomReservation.observation,
            reservationDate: roomReservation.reservationDate,
            reservationTime: ReservationTime[roomReservation.reservationTime],
            admin: true,
            additionals: roomReservation.additionals,
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
          roomId: roomReservation.roomId,
          roomName: room?.roomName,
          roomLocation: location?.locationName,
          observation: roomReservation.observation,
          reservationDate: roomReservation.reservationDate,
          reservationTime: ReservationTime[roomReservation.reservationTime],
          additionals: roomReservation.additionals,
        },
      });
    }

    const updated = await this.roomReservationRepository.findById(
      roomReservation.id,
    );
    void this.notificationService.handleNotification(
      updated,
      ActionNotification.CREATE,
      EntityNotification.ROOM,
    );
    return updated;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.roomReservationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        filters: paginationOptions.filters,
      },
    });
  }

  findOne(id: RoomReservation['id']) {
    return this.roomReservationRepository.findById(id);
  }

  update(
    id: RoomReservation['id'],
    updateRoomReservationDto: UpdateRoomReservationDto,
  ) {
    void this.roomReservationRepository.update(id, updateRoomReservationDto);
    const updated = this.roomReservationRepository.findById(id);
    void this.notificationService.handleNotification(
      updated,
      ActionNotification.UPDATE,
      EntityNotification.ROOM,
    );
    return updated;
  }

  remove(id: RoomReservation['id']) {
    const removed = this.roomReservationRepository.remove(id);
    void this.notificationService.handleNotification(
      removed,
      ActionNotification.DELETE,
      EntityNotification.ROOM,
    );
    return removed;
  }
}
