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
import { GaragesService } from './garages.service';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Garage } from './domain/garage';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllGaragesDto } from './dto/find-all-garages.dto';

@ApiTags('Garages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'garages',
  version: '1',
})
export class GaragesController {
  constructor(private readonly garagesService: GaragesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Garage,
  })
  create(@Body() createGarageDto: CreateGarageDto) {
    return this.garagesService.create(createGarageDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Garage),
  })
  async findAll(
    @Query() query: FindAllGaragesDto,
  ): Promise<InfinityPaginationResponseDto<Garage>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.garagesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
          filters: { garageType: query.garageType },
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
    type: Garage,
  })
  findOne(@Param('id') id: string) {
    return this.garagesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Garage,
  })
  update(@Param('id') id: string, @Body() updateGarageDto: UpdateGarageDto) {
    return this.garagesService.update(id, updateGarageDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.garagesService.remove(id);
  }
}
