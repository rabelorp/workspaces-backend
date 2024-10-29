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
import { CurrentUser } from 'src/auth/current-user.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { RoleEnum } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';

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
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({
    type: Garage,
  })
  create(
    @Body() createGarageDto: CreateGarageDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.garagesService.create(createGarageDto, currentUser);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Garage),
  })
  async findAll(
    @Query() query: FindAllGaragesDto,
  ): Promise<InfinityPaginationResponseDto<Garage>> {
    const filters: Record<string, any> = {
      locationId: query.locationId,
    };
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const { data, totalItems } =
      await this.garagesService.findAllWithPagination({
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
    type: Garage,
  })
  findOne(@Param('id') id: string) {
    return this.garagesService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Garage,
  })
  update(
    @Param('id') id: string,
    @Body() updateGarageDto: UpdateGarageDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.garagesService.update(id, updateGarageDto, currentUser);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string, @CurrentUser() currentUser: any) {
    return this.garagesService.remove(id, currentUser);
  }
}
