import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Request,
  SetMetadata,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, GetOrdersQueryDto } from '@repo/ui/dto/order.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Order } from './entities/order.entity';
import { PermissionGuard } from '../permission/permission.guard';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Public } from 'src/auth/public.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create order' })
  @ApiCreatedResponse({ type: Order })
  create(@Request() req, @Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  // @ApiOkResponse({ type: Order, isArray: true })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.order.read])
  findPaginated(
    @Request() req,
    @Query(ValidationPipe) query: GetOrdersQueryDto,
  ) {
    const options: IPaginationOptions = {
      page: query.page || 1,
      limit: query.limit || 10,
      route: req.path,
    };
    return this.orderService.findPaginated(options, query);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get all orders for user' })
  @ApiOkResponse({ type: Order, isArray: true })
  getOrdersForUser(
    @Request() req,
    @Query(ValidationPipe) query: GetOrdersQueryDto,
  ) {
    const options: IPaginationOptions = {
      page: query.page || 1,
      limit: query.limit || 10,
      route: req.path,
    };
    return this.orderService.findPaginated(options, query, req.user.id);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiOkResponse({ type: Order })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne({ where: { id } });
  }
}
