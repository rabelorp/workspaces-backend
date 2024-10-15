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
import { CheckInsService } from './check-ins.service';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { UpdateCheckInDto } from './dto/update-check-in.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CheckIn } from './domain/check-in';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllCheckInsDto } from './dto/find-all-check-ins.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';

@ApiTags('Checkins')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'check-ins',
  version: '1',
})
export class CheckInsController {
  constructor(private readonly checkInsService: CheckInsService) {}

  @Post()
  @ApiCreatedResponse({
    type: CheckIn,
  })
  create(
    @Body() createCheckInDto: CreateCheckInDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.checkInsService.create(createCheckInDto, currentUser);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(CheckIn),
  })
  async findAll(
    @Query() query: FindAllCheckInsDto,
  ): Promise<InfinityPaginationResponseDto<CheckIn>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.checkInsService.findAllWithPagination({
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
    type: CheckIn,
  })
  findOne(@Param('id') id: string) {
    return this.checkInsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: CheckIn,
  })
  update(@Param('id') id: string, @Body() updateCheckInDto: UpdateCheckInDto) {
    return this.checkInsService.update(id, updateCheckInDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.checkInsService.remove(id);
  }
}
