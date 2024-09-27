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
import { LockersService } from './lockers.service';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto } from './dto/update-locker.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Locker } from './domain/locker';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllLockersDto } from './dto/find-all-lockers.dto';

@ApiTags('Lockers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'lockers',
  version: '1',
})
export class LockersController {
  constructor(private readonly lockersService: LockersService) {}

  @Post()
  @ApiCreatedResponse({
    type: Locker,
  })
  create(@Body() createLockerDto: CreateLockerDto) {
    return this.lockersService.create(createLockerDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Locker),
  })
  async findAll(
    @Query() query: FindAllLockersDto,
  ): Promise<InfinityPaginationResponseDto<Locker>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.lockersService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
          filters: {
            locationId: query.locationId,
          },
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
    type: Locker,
  })
  findOne(@Param('id') id: string) {
    return this.lockersService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Locker,
  })
  update(@Param('id') id: string, @Body() updateLockerDto: UpdateLockerDto) {
    return this.lockersService.update(id, updateLockerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.lockersService.remove(id);
  }
}
