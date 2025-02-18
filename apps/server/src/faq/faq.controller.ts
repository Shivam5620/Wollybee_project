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
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto, UpdateFaqDto } from '@repo/ui/dto/faq.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Faq } from './entities/faq.entity';
import { PermissionGuard } from '../permission/permission.guard';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Public } from '../auth/public.decorator';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';

ApiBearerAuth();
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @ApiOperation({ summary: 'Create faq' })
  @ApiCreatedResponse({ type: Faq })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.faq.create])
  create(@Body(ValidationPipe) createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all faqs' })
  @ApiOkResponse({ type: Faq, isArray: true })
  findAll() {
    return this.faqService.find({
      order: { id: 'ASC' },
    });
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get faq by id' })
  @ApiOkResponse({ type: Faq })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.faqService.findOne({ where: { id } });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update faq by id' })
  @ApiOkResponse({ type: Faq })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.faq.update])
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFaqDto: UpdateFaqDto,
  ) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete faq by id' })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.faq.delete])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.faqService.remove(id);
  }
}
