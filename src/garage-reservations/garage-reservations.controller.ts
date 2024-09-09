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

@ApiTags('Garagereservations')
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
  create(@Body() createGarageReservationDto: CreateGarageReservationDto) {
    return this.garageReservationsService.create(createGarageReservationDto);
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

    return infinityPagination(
      await this.garageReservationsService.findAllWithPagination({
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
  ) {
    return this.garageReservationsService.update(
      id,
      updateGarageReservationDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.garageReservationsService.remove(id);
  }
}
