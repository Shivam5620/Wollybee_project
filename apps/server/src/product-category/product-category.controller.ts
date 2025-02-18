import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
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
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { ProductCategory } from './entities/product-category.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Product Category')
@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productCategory.create])
  @ApiOperation({ summary: 'Create Product Category' })
  @ApiCreatedResponse({ type: ProductCategory })
  @Post()
  create(
    @Body(ValidationPipe) createProductCategoryDto: CreateProductCategoryDto,
  ) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get All Product Categories' })
  @ApiOkResponse({ type: ProductCategory, isArray: true })
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get Product Category by ID' })
  @ApiOkResponse({ type: ProductCategory })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoryService.findOne(id);
  }

  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productCategory.update])
  @ApiOperation({ summary: 'Update Product Category by ID' })
  @ApiOkResponse({ type: ProductCategory })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(id, updateProductCategoryDto);
  }

  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productCategory.delete])
  @ApiOperation({ summary: 'Delete Product Category by ID' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoryService.remove(id);
  }
}
