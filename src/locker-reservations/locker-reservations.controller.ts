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
import { LockerReservationsService } from './locker-reservations.service';
import { CreateLockerReservationDto } from './dto/create-locker-reservation.dto';
import { UpdateLockerReservationDto } from './dto/update-locker-reservation.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LockerReservation } from './domain/locker-reservation';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllLockerReservationsDto } from './dto/find-all-locker-reservations.dto';

@ApiTags('LockerReservations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'locker-reservations',
  version: '1',
})
export class LockerReservationsController {
  constructor(
    private readonly lockerReservationsService: LockerReservationsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: LockerReservation,
  })
  create(@Body() createLockerReservationDto: CreateLockerReservationDto) {
    return this.lockerReservationsService.create(createLockerReservationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(LockerReservation),
  })
  async findAll(
    @Query() query: FindAllLockerReservationsDto,
  ): Promise<InfinityPaginationResponseDto<LockerReservation>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.lockerReservationsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
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
    type: LockerReservation,
  })
  findOne(@Param('id') id: string) {
    return this.lockerReservationsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: LockerReservation,
  })
  update(
    @Param('id') id: string,
    @Body() updateLockerReservationDto: UpdateLockerReservationDto,
  ) {
    return this.lockerReservationsService.update(
      id,
      updateLockerReservationDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.lockerReservationsService.remove(id);
  }
}
