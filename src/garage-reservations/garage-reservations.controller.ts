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
import { GarageReservationsService } from './garage-reservations.service';
import { CreateGarageReservationDto } from './dto/create-garage-reservation.dto';
import { UpdateGarageReservationDto } from './dto/update-garage-reservation.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GarageReservation } from './domain/garage-reservation';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllGarageReservationsDto } from './dto/find-all-garage-reservations.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';

@ApiTags('GarageReservations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'garage-reservations',
  version: '1',
})
export class GarageReservationsController {
  constructor(
    private readonly garageReservationsService: GarageReservationsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: GarageReservation,
  })
  create(
    @Body() createGarageReservationDto: CreateGarageReservationDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.garageReservationsService.create(
      createGarageReservationDto,
      currentUser,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(GarageReservation),
  })
  async findAll(
    @Query() query: FindAllGarageReservationsDto,
  ): Promise<InfinityPaginationResponseDto<GarageReservation>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const { data, totalItems } =
      await this.garageReservationsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
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
    type: GarageReservation,
  })
  findOne(@Param('id') id: string) {
    return this.garageReservationsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: GarageReservation,
  })
  update(
    @Param('id') id: string,
    @Body() updateGarageReservationDto: UpdateGarageReservationDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.garageReservationsService.update(
      id,
      updateGarageReservationDto,
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
    return this.garageReservationsService.remove(id, currentUser);
  }
}
