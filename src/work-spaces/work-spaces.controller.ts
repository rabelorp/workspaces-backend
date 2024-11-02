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
import { WorkSpacesService } from './work-spaces.service';
import { CreateWorkSpacesDto } from './dto/create-work-spaces.dto';
import { UpdateWorkSpacesDto } from './dto/update-work-spaces.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { WorkSpaces } from './domain/work-spaces';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllWorkSpacesDto } from './dto/find-all-work-spaces.dto';

@ApiTags('Workspaces')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'work-spaces',
  version: '1',
})
export class WorkSpacesController {
  constructor(private readonly workSpacesService: WorkSpacesService) {}

  @Post()
  @ApiCreatedResponse({
    type: WorkSpaces,
  })
  @ApiExcludeEndpoint()
  create(@Body() createWorkSpacesDto: CreateWorkSpacesDto) {
    return this.workSpacesService.create(createWorkSpacesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(WorkSpaces),
  })
  async findAll(
    @Query() query: FindAllWorkSpacesDto,
  ): Promise<InfinityPaginationResponseDto<WorkSpaces>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const { data, totalItems } =
      await this.workSpacesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      });

    return infinityPagination(data, { page, limit }, totalItems);
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: WorkSpaces,
  })
  findOne(@Param('id') id: string) {
    return this.workSpacesService.findOne(id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: WorkSpaces,
  })
  update(
    @Param('id') id: string,
    @Body() updateWorkSpacesDto: UpdateWorkSpacesDto,
  ) {
    return this.workSpacesService.update(id, updateWorkSpacesDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.workSpacesService.remove(id);
  }
}
