import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RoomReservationsService } from './room-reservations.service';
import { CreateRoomReservationDto } from './dto/create-room-reservation.dto';
import { UpdateRoomReservationDto } from './dto/update-room-reservation.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RoomReservation } from './domain/room-reservation';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRoomReservationsDto } from './dto/find-all-room-reservations.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UsersService } from 'src/users/users.service';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiTags('RoomReservations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'room-reservations',
  version: '1',
})
export class RoomReservationsController {
  constructor(
    private readonly roomReservationsService: RoomReservationsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: RoomReservation,
  })
  create(
    @Body() createRoomReservationDto: CreateRoomReservationDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.roomReservationsService.create(
      createRoomReservationDto,
      currentUser,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(RoomReservation),
  })
  async findAll(
    @Query() query: FindAllRoomReservationsDto,
    @CurrentUser() currentUser: any,
  ): Promise<InfinityPaginationResponseDto<RoomReservation>> {
    const user = await this.usersService.findById(currentUser.id);

    const filters: Record<string, any> =
      user?.role?.id === RoleEnum.user
        ? {
            userId: currentUser.id,
            reservationDate: query.reservationDate,
          }
        : { reservationDate: query.reservationDate };

    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const { data, totalItems } =
      await this.roomReservationsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
          filters,
        },
      });

    return infinityPagination(data, { page, limit }, totalItems);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RoomReservation,
  })
  findOne(@Param('id') id: string) {
    return this.roomReservationsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RoomReservation,
  })
  update(
    @Param('id') id: string,
    @Body() updateRoomReservationDto: UpdateRoomReservationDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.roomReservationsService.update(
      id,
      updateRoomReservationDto,
      currentUser,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string, @CurrentUser() currentUser: any) {
    return this.roomReservationsService.remove(id, currentUser);
  }
}
