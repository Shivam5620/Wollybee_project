import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../permission/permission.guard';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { Public } from '../auth/public.decorator';
import { Configuration } from './entities/configuration.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Configuration')
@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Configuration' })
  @ApiCreatedResponse({ type: Configuration })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.configuration.create])
  create(@Body(ValidationPipe) createConfigurationDto: CreateConfigurationDto) {
    return this.configurationService.create(createConfigurationDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get Configuration' })
  @ApiOkResponse({ type: Configuration, isArray: true })
  findAll() {
    return this.configurationService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Configuration' })
  @ApiOkResponse({ type: Configuration })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.configuration.update])
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateConfigurationDto: UpdateConfigurationDto,
  ) {
    return this.configurationService.update(id, updateConfigurationDto);
  }
}
