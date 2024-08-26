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
import { WorkStationsService } from './work-stations.service';
import { CreateWorkStationDto } from './dto/create-work-station.dto';
import { UpdateWorkStationDto } from './dto/update-work-station.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { WorkStation } from './domain/work-station';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllWorkStationsDto } from './dto/find-all-work-stations.dto';

@ApiTags('Workstations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'work-stations',
  version: '1',
})
export class WorkStationsController {
  constructor(private readonly workStationsService: WorkStationsService) {}

  @Post()
  @ApiCreatedResponse({
    type: WorkStation,
  })
  create(@Body() createWorkStationDto: CreateWorkStationDto) {
    return this.workStationsService.create(createWorkStationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(WorkStation),
  })
  async findAll(
    @Query() query: FindAllWorkStationsDto,
  ): Promise<InfinityPaginationResponseDto<WorkStation>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.workStationsService.findAllWithPagination({
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
    type: WorkStation,
  })
  findOne(@Param('id') id: string) {
    return this.workStationsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: WorkStation,
  })
  update(
    @Param('id') id: string,
    @Body() updateWorkStationDto: UpdateWorkStationDto,
  ) {
    return this.workStationsService.update(id, updateWorkStationDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.workStationsService.remove(id);
  }
}
