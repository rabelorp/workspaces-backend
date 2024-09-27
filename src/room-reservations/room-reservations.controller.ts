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
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: RoomReservation,
  })
  create(@Body() createRoomReservationDto: CreateRoomReservationDto) {
    return this.roomReservationsService.create(createRoomReservationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(RoomReservation),
  })
  async findAll(
    @Query() query: FindAllRoomReservationsDto,
  ): Promise<InfinityPaginationResponseDto<RoomReservation>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.roomReservationsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
          filters: { reservationDate: query.reservationDate },
        },
      }),
      { page, limit },
    );
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
  ) {
    return this.roomReservationsService.update(id, updateRoomReservationDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.roomReservationsService.remove(id);
  }
}
