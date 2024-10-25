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
import { CurrentUser } from 'src/auth/current-user.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { UsersService } from 'src/users/users.service';

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
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: WorkStationReservation,
  })
  create(
    @Body() createWorkStationReservationDto: CreateWorkStationReservationDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.workStationReservationsService.create(
      createWorkStationReservationDto,
      currentUser,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(WorkStationReservation),
  })
  async findAll(
    @Query() query: FindAllWorkStationReservationsDto,
    @CurrentUser() currentUser: any,
  ): Promise<InfinityPaginationResponseDto<WorkStationReservation>> {
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
      await this.workStationReservationsService.findAllWithPagination({
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
    @CurrentUser() currentUser: any,
  ) {
    return this.workStationReservationsService.update(
      id,
      updateWorkStationReservationDto,
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
    return this.workStationReservationsService.remove(id, currentUser);
  }
}
