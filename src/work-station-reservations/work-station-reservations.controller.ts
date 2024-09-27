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
import { WorkStationReservationsService } from './work-station-reservations.service';
import { CreateWorkStationReservationDto } from './dto/create-work-station-reservation.dto';
import { UpdateWorkStationReservationDto } from './dto/update-work-station-reservation.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { WorkStationReservation } from './domain/work-station-reservation';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllWorkStationReservationsDto } from './dto/find-all-work-station-reservations.dto';

@ApiTags('WorkstationReservations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'work-station-reservations',
  version: '1',
})
export class WorkStationReservationsController {
  constructor(
    private readonly workStationReservationsService: WorkStationReservationsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: WorkStationReservation,
  })
  create(
    @Body() createWorkStationReservationDto: CreateWorkStationReservationDto,
  ) {
    return this.workStationReservationsService.create(
      createWorkStationReservationDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(WorkStationReservation),
  })
  async findAll(
    @Query() query: FindAllWorkStationReservationsDto,
  ): Promise<InfinityPaginationResponseDto<WorkStationReservation>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.workStationReservationsService.findAllWithPagination({
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
    type: WorkStationReservation,
  })
  findOne(@Param('id') id: string) {
    return this.workStationReservationsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: WorkStationReservation,
  })
  update(
    @Param('id') id: string,
    @Body() updateWorkStationReservationDto: UpdateWorkStationReservationDto,
  ) {
    return this.workStationReservationsService.update(
      id,
      updateWorkStationReservationDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.workStationReservationsService.remove(id);
  }
}
