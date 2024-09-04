import { Injectable } from '@nestjs/common';
import { CreateRoomReservationDto } from './dto/create-room-reservation.dto';
import { UpdateRoomReservationDto } from './dto/update-room-reservation.dto';
import { RoomReservationRepository } from './infrastructure/persistence/room-reservation.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RoomReservation } from './domain/room-reservation';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from 'src/rooms/rooms.service';

@Injectable()
export class RoomReservationsService {
  constructor(
    private readonly roomReservationRepository: RoomReservationRepository,
    private mailService: MailService,
    private readonly userService: UsersService,
    private readonly roomService: RoomsService,
  ) {}
  async create(createRoomReservationDto: CreateRoomReservationDto) {
    const roomReservation = await this.roomReservationRepository.create(
      createRoomReservationDto,
    );

    const admins = await this.userService.findByRole(1);
    const user = await this.userService.findById(roomReservation.userId);
    const room = await this.roomService.findOne(roomReservation.roomId);

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
            roomLocation: room?.location,
            observation: roomReservation.observation,
            reservationDate: roomReservation.reservationDate,
            reservationTime: roomReservation.reservationTime,
          },
        });
      }
    }

    return roomReservation;
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
    return this.roomReservationRepository.update(id, updateRoomReservationDto);
  }

  remove(id: RoomReservation['id']) {
    return this.roomReservationRepository.remove(id);
  }
}
