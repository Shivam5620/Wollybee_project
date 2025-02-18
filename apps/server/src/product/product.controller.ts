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
  UseInterceptors,
  UseGuards,
  SetMetadata,
  Query,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../permission/permission.guard';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { Public } from '../auth/public.decorator';
import { Product } from './entities/product.entity';
import {
  GetProductFilterDto,
  GetProductsQueryDto,
} from './dto/get-product-filters.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Product')
@Controller('product')
@UseInterceptors(CacheInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create Product' })
  @ApiCreatedResponse({ type: Product })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.product.create])
  @Post()
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @ApiOperation({ summary: 'Get All Products' })
  @ApiOkResponse({ type: Product, isArray: true })
  @CacheKey('products')
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get('paginated-products')
  @ApiOperation({ summary: 'Get paginated products' })
  findPaginated(
    @Request() req,
    @Query(ValidationPipe) query: GetProductsQueryDto,
  ) {
    const options: IPaginationOptions = {
      page: query.page || 1,
      limit: query.limit || 10,
      route: req.path,
    };
    return this.productService.findPaginated(options, query);
  }

  @Public()
  @ApiOperation({ summary: 'Get Product Filters' })
  @ApiOkResponse({ type: GetProductFilterDto })
  @Get('filters')
  getFilters() {
    return this.productService.getFilters();
  }

  @Public()
  @ApiOperation({ summary: 'Get Product by ID' })
  @ApiOkResponse({ type: Product })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne({ where: { id } });
  }

  @ApiOperation({ summary: 'Update Product by ID' })
  @ApiOkResponse({ type: Product })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.product.update])
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete Product by ID' })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.product.delete])
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
