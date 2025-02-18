import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
  SetMetadata,
} from '@nestjs/common';
import { FaqCategoryService } from './faq-category.service';
import {
  CreateFaqCategoryDto,
  UpdateFaqCategoryDto,
} from '@repo/ui/dto/faq-category.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../permission/permission.guard';
import { FaqCategory } from './entities/faq-category.entity';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { Public } from '../auth/public.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('FAQ')
@Controller('faq-category')
export class FaqCategoryController {
  constructor(private readonly faqCategoryService: FaqCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create faq category' })
  @ApiCreatedResponse({ type: FaqCategory })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.faqCategory.create])
  create(@Body(ValidationPipe) createFaqCategoryDto: CreateFaqCategoryDto) {
    return this.faqCategoryService.create(createFaqCategoryDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all faq category' })
  @ApiOkResponse({ type: FaqCategory, isArray: true })
  findAll() {
    return this.faqCategoryService.find({
      order: { id: 'ASC' },
    });
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get faq category by id' })
  @ApiOkResponse({ type: FaqCategory })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.faqCategoryService.findOne({ where: { id } });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update faq category by id' })
  @ApiOkResponse({ type: FaqCategory })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.faqCategory.update])
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFaqCategoryDto: UpdateFaqCategoryDto,
  ) {
    return this.faqCategoryService.update(id, updateFaqCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete faq category by id' })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.faqCategory.delete])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.faqCategoryService.remove(id);
  }
}
