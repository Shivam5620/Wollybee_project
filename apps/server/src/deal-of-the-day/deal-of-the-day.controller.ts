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
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { DealOfTheDayService } from './deal-of-the-day.service';
import { CreateDealOfTheDayDto } from './dto/create-deal-of-the-day.dto';
import { UpdateDealOfTheDayDto } from './dto/update-deal-of-the-day.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetDealOfTheDayQueryDto } from './dto/get-deal-of-the-day.dto';
import { PermissionGuard } from '../permission/permission.guard';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Public } from '../auth/public.decorator';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { DealOfTheDay } from './entities/deal-of-the-day.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Deal Of The Day')
@Controller('deal-of-the-day')
export class DealOfTheDayController {
  constructor(private readonly dealOfTheDayService: DealOfTheDayService) {}

  @Post()
  @ApiOperation({ summary: 'Create Deal Of The Day' })
  @ApiCreatedResponse({ type: DealOfTheDay })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.dealOfTheDay.create])
  create(@Body(ValidationPipe) createDealOfTheDayDto: CreateDealOfTheDayDto) {
    return this.dealOfTheDayService.create(createDealOfTheDayDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get All Deal Of The Day' })
  @ApiOkResponse({ type: DealOfTheDay, isArray: true })
  findAll(@Query(ValidationPipe) query: GetDealOfTheDayQueryDto) {
    return this.dealOfTheDayService.findAll(query);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Deal Of The Day' })
  @ApiOkResponse({ type: DealOfTheDay })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.dealOfTheDay.update])
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDealOfTheDayDto: UpdateDealOfTheDayDto,
  ) {
    return this.dealOfTheDayService.update(id, updateDealOfTheDayDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Deal Of The Day' })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.dealOfTheDay.delete])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dealOfTheDayService.remove(id);
  }
}
