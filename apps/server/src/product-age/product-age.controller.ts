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
import { ProductAgeService } from './product-age.service';
import { CreateProductAgeDto } from './dto/create-product-age.dto';
import { UpdateProductAgeDto } from './dto/update-product-age.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../permission/permission.guard';
import { Public } from '../auth/public.decorator';
import { PERMISSION_METADATA_KEY } from '@repo/ui/lib/constants';
import { permissions } from '@repo/ui/lib/constants';
import { ProductAge } from './entities/product-age.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Product Age')
@Controller('product-age')
export class ProductAgeController {
  constructor(private readonly productAgeService: ProductAgeService) {}

  @Post()
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productAge.create])
  @ApiOperation({ summary: 'Create Product Age' })
  @ApiCreatedResponse({ type: ProductAge })
  create(@Body(ValidationPipe) createProductAgeDto: CreateProductAgeDto) {
    return this.productAgeService.create(createProductAgeDto);
  }

  @Public()
  @ApiOperation({ summary: 'Find All Product Age' })
  @ApiOkResponse({ type: ProductAge, isArray: true })
  @Get()
  findAll() {
    return this.productAgeService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Find Product Age by ID' })
  @ApiOkResponse({ type: ProductAge })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productAgeService.findOne(id);
  }

  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productAge.update])
  @ApiOperation({ summary: 'Update Product Age by ID' })
  @ApiOkResponse({ type: ProductAge })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProductAgeDto: UpdateProductAgeDto,
  ) {
    return this.productAgeService.update(id, updateProductAgeDto);
  }

  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productAge.delete])
  @ApiOperation({ summary: 'Delete Product Age by ID' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productAgeService.remove(id);
  }
}
