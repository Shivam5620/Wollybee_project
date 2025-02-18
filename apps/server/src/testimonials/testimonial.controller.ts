import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PermissionGuard } from 'src/permission/permission.guard';
import { Testimonial } from './entities/testimonial.entity';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { Public } from 'src/auth/public.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('testimonial')
@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialsService: TestimonialService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new testimonial' })
  @ApiCreatedResponse({ type: Testimonial })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.testimonial.create])
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all testimonials' })
  @ApiOkResponse({ type: Testimonial, isArray: true })
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a testimonial by ID' })
  @ApiOkResponse({ type: Testimonial })
  findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a testimonial by ID' })
  @ApiOkResponse({ type: Testimonial })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.testimonial.update])
  update(
    @Param('id') id: string,
    @Body() createTestimonialDto: CreateTestimonialDto,
  ) {
    return this.testimonialsService.update(+id, createTestimonialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a testimonial by ID' })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.testimonial.delete])
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(+id);
  }
}
