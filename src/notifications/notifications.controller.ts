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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Notification } from './domain/notification';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllNotificationsDto } from './dto/find-all-notifications.dto';
import { FilterUserDto } from 'src/users/dto/query-user.dto';
import { RoleEnum } from 'src/roles/roles.enum';
import { UsersService } from 'src/users/users.service';
import { CurrentUser } from 'src/auth/current-user.decorator';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  // @ApiExcludeEndpoint()
  @ApiCreatedResponse({
    type: Notification,
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Notification),
  })
  async findAll(
    @Query() query: FindAllNotificationsDto,
    @CurrentUser() currentUser: any,
  ): Promise<InfinityPaginationResponseDto<Notification>> {
    const user = await this.usersService.findById(currentUser.id);

    const filters: FilterUserDto =
      user?.role?.id === RoleEnum.user
        ? {
            userId: currentUser.id,
            entity: query.entity,
          }
        : { userId: query.userId, entity: query.entity };

    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const { data, totalItems } =
      await this.notificationsService.findAllWithPagination({
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
    type: Notification,
  })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Notification,
  })
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
