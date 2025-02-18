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
import { ProductInterestService } from './product-interest.service';
import { CreateProductInterestDto } from './dto/create-product-interest.dto';
import { UpdateProductInterestDto } from './dto/update-product-interest.dto';
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
import { ProductInterest } from './entities/product-interest.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Product Interest')
@Controller('product-interest')
export class ProductInterestController {
  constructor(
    private readonly productInterestService: ProductInterestService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Product Interest' })
  @ApiCreatedResponse({ type: ProductInterest })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productInterest.create])
  create(
    @Body(ValidationPipe) createProductInterestDto: CreateProductInterestDto,
  ) {
    return this.productInterestService.create(createProductInterestDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Find All Product Interest' })
  @ApiOkResponse({ type: ProductInterest, isArray: true })
  findAll() {
    return this.productInterestService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Find Product Interest by ID' })
  @ApiOkResponse({ type: ProductInterest })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productInterestService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Product Interest by ID' })
  @ApiOkResponse({ type: ProductInterest })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productInterest.update])
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductInterestDto: UpdateProductInterestDto,
  ) {
    return this.productInterestService.update(id, updateProductInterestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Product Interest by ID' })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.productInterest.delete])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productInterestService.remove(id);
  }
}
