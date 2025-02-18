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
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from '@repo/ui/dto/role.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { PermissionGuard } from '../permission/permission.guard';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Role } from './entities/role.entity';

@ApiTags('Role')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiConflictResponse({
    description: 'Role already exists',
    schema: {
      example: {
        message: 'Role already exists with name SuperAdmin',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.role.create])
  @Post()
  create(@Body(ValidationPipe) createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Returns all roles',
    type: Role,
    isArray: true,
  })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.role.read])
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({ status: 200, description: 'Returns role by id', type: Role })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.role.read])
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: 200, description: 'Returns updated role', type: Role })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.role.update])
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Delete role' })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.role.delete])
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }
}
