import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  ParseIntPipe,
  Request,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import {
  GetProductReviewQueryDto,
  GetProductReviewsDto,
} from './dto/get-product-review.dto';
import { ProductReview } from './entities/product-review.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PermissionGuard } from '../permission/permission.guard';
import { Public } from '../auth/public.decorator';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Product Review')
@Controller('product-review')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create product review' })
  @ApiCreatedResponse({ type: ProductReview })
  create(
    @Request() req,
    @Body(ValidationPipe) createProductReviewDto: CreateProductReviewDto,
  ) {
    return this.productReviewService.create(createProductReviewDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product reviews' })
  @ApiOkResponse({ type: GetProductReviewsDto })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productReview.read])
  async getPaginatedReviews(
    @Request() req,
    @Query(ValidationPipe) query: GetProductReviewQueryDto,
  ): Promise<Pagination<ProductReview>> {
    const options: IPaginationOptions = {
      page: query.page || 1,
      limit: query.limit || 10,
      route: req.path,
    };
    return this.productReviewService.getPaginatedReviews(options, query);
  }

  @Public()
  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all product reviews for product' })
  @ApiOkResponse({ type: ProductReview, isArray: true })
  getProductReviewsForProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productReviewService.getProductReviewsForProduct(productId);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get all product reviews for user' })
  @ApiOkResponse({ type: ProductReview, isArray: true })
  getProductReviewsForUser(@Request() req) {
    return this.productReviewService.getProductReviewsForUser(req.user.id);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get product review by id' })
  @ApiOkResponse({ type: ProductReview })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productReviewService.findOne({ where: { id } });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product review' })
  @ApiOkResponse({ type: ProductReview })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body(ValidationPipe) updateProductReviewDto: UpdateProductReviewDto,
  ) {
    return this.productReviewService.update(
      id,
      req.user,
      updateProductReviewDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product review by id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productReviewService.remove(id);
  }
}
