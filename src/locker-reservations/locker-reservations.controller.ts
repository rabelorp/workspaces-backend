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
import { LockerReservationsService } from './locker-reservations.service';
import { CreateLockerReservationDto } from './dto/create-locker-reservation.dto';
import { UpdateLockerReservationDto } from './dto/update-locker-reservation.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LockerReservation } from './domain/locker-reservation';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllLockerReservationsDto } from './dto/find-all-locker-reservations.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UsersService } from 'src/users/users.service';
import { FilterUserDto } from 'src/users/dto/query-user.dto';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiTags('LockerReservations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'locker-reservations',
  version: '1',
})
export class LockerReservationsController {
  constructor(
    private readonly lockerReservationsService: LockerReservationsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: LockerReservation,
  })
  create(
    @Body() createLockerReservationDto: CreateLockerReservationDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.lockerReservationsService.create(
      createLockerReservationDto,
      currentUser,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(LockerReservation),
  })
  async findAll(
    @Query() query: FindAllLockerReservationsDto,
    @CurrentUser() currentUser: any,
  ): Promise<InfinityPaginationResponseDto<LockerReservation>> {
    const user = await this.usersService.findById(currentUser.id);

    const filters: FilterUserDto =
      user?.role?.id === RoleEnum.user
        ? {
            userId: currentUser.id,
          }
        : {};

    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const { data, totalItems } =
      await this.lockerReservationsService.findAllWithPagination({
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
    type: LockerReservation,
  })
  findOne(@Param('id') id: string) {
    return this.lockerReservationsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: LockerReservation,
  })
  update(
    @Param('id') id: string,
    @Body() updateLockerReservationDto: UpdateLockerReservationDto,
    @CurrentUser() currentUser: any,
  ) {
    return this.lockerReservationsService.update(
      id,
      updateLockerReservationDto,
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
    return this.lockerReservationsService.remove(id, currentUser);
  }
}
