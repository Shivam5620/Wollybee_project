import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { BulkAddCartItemsDto } from './dto/bulk-add-cart-items.dto';

@ApiTags('Cart Item')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({ summary: 'Create cart item for user' })
  @Post()
  create(
    @Request() req,
    @Body(ValidationPipe) createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartItemService.create(req.user.id, createCartItemDto);
  }

  @ApiOperation({ summary: 'Bulk add items to cart for user' })
  @Post('bulk')
  bulkAdd(
    @Request() req,
    @Body(ValidationPipe) bulkAddCartItemsDto: BulkAddCartItemsDto,
  ) {
    return this.cartItemService.bulkAdd(req.user.id, bulkAddCartItemsDto.items);
  }

  @ApiOperation({ summary: 'Get cart items for user' })
  @Get()
  findCartItemsForUser(@Request() req) {
    return this.cartItemService.findCartItemsForUser(req.user.id);
  }

  @ApiOperation({ summary: 'Remove cart item for user' })
  @Delete(':productId')
  remove(@Request() req, @Param('productId', ParseIntPipe) productId: number) {
    return this.cartItemService.remove(req.user.id, productId);
  }

  @ApiOperation({ summary: 'Clear cart for user' })
  @Delete()
  clearCart(@Request() req) {
    return this.cartItemService.clearCart(req.user.id);
  }
}
