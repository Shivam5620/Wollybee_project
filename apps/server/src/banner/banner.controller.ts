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
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
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
import { Banner } from './entities/banner.entity';
import { IGetBannersQueryDto } from './dto/get-banner.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.banner.create])
  @ApiOperation({ summary: 'Create Banner' })
  @ApiCreatedResponse({ type: Banner })
  @Post()
  create(@Body(ValidationPipe) createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @Public()
  @ApiOperation({ summary: 'Find All Banner' })
  @ApiOkResponse({ type: Banner, isArray: true })
  @Get()
  findAll(@Query(ValidationPipe) query: IGetBannersQueryDto) {
    return this.bannerService.findAll({
      where: {
        ...query,
      },
    });
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Find Banner by ID' })
  @ApiOkResponse({ type: Banner })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.findOne(id);
  }

  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.banner.update])
  @ApiOperation({ summary: 'Update Banner by ID' })
  @ApiOkResponse({ type: Banner })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBannerDto: UpdateBannerDto,
  ) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.banner.delete])
  @ApiOperation({ summary: 'Delete Banner by ID' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.remove(id);
  }
}
