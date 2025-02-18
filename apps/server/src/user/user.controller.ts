import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
  Query,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@repo/ui/dto/user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../permission/permission.guard';
import { Public } from '../auth/public.decorator';
import { PERMISSION_METADATA_KEY } from '@repo/ui/lib/constants';
import { permissions } from '@repo/ui/lib/constants';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { GetPaginatedQueryDto } from '@repo/ui/dto/common.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: User })
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiCreatedResponse({ type: User, isArray: true })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.user.read])
  findPaginated(
    @Request() req,
    @Query(ValidationPipe) query: GetPaginatedQueryDto,
  ) {
    const options: IPaginationOptions = {
      page: query.page || 1,
      limit: query.limit || 10,
      route: req.path,
    };
    return this.userService.findPaginated(options);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: User })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.user.read])
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne({ where: { id } });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({ type: User })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.user.update])
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.user.delete])
  @ApiOperation({ summary: 'Delete user by id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
