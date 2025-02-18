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
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permission } from './entities/permission.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from './permission.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Create new permission' })
  @ApiResponse({ status: 201, type: Permission })
  @Post()
  create(@Body(ValidationPipe) createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, type: Permission, isArray: true })
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @ApiOperation({ summary: 'Get permission by id' })
  @ApiResponse({ status: 200, type: Permission })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.findOne(id);
  }

  @ApiOperation({ summary: 'Update permission by id' })
  @ApiResponse({ status: 200, type: Permission })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Delete permission by id' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.remove(id);
  }
}
