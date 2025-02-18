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
  // UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import {
  CreateCouponDto,
  UpdateCouponDto,
  ValidateCouponDto,
  ValidateCouponResponseDto,
} from '@repo/ui/dto/coupon.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
// import { JwtAuthGuard } from '../auth/auth.guard';
// import { PermissionGuard } from '../permission/permission.guard';
import { Public } from '../auth/public.decorator';
import { PERMISSION_METADATA_KEY, permissions } from '@repo/ui/lib/constants';
import { Coupon } from './entities/coupon.entity';

@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @ApiOperation({ summary: 'Create Coupon' })
  @ApiCreatedResponse({ type: Coupon })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.coupon.create])
  create(@Body(ValidationPipe) createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate Coupon for Order' })
  @ApiCreatedResponse({ type: ValidateCouponResponseDto })
  validateCoupon(
    @Body(ValidationPipe)
    validateCouponDto: ValidateCouponDto,
  ) {
    return this.couponService.validateCoupon(validateCouponDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get All Coupon' })
  @ApiOkResponse({ type: Coupon, isArray: true })
  findAll() {
    return this.couponService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get Coupon by ID' })
  @ApiOkResponse({ type: Coupon })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.couponService.findOne({
      where: { id },
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Coupon by ID' })
  @ApiOkResponse({ type: Coupon })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.coupon.update])
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Coupon by ID' })
  @SetMetadata(PERMISSION_METADATA_KEY, [permissions.coupon.delete])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.couponService.remove(id);
  }
}
