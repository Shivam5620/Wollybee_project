import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { ICoupon } from '@repo/ui/types/coupon';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CreateOrderDto } from './order.dto';

export class CreateCouponDto implements Partial<ICoupon> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'OFF20', required: true })
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '20% OFF UPTO Rs. 200',
    required: true,
  })
  description: string;

  @IsNumber()
  @ApiProperty({ type: Number, example: 20, required: true })
  discountPercentage: number;

  @ApiProperty({ type: Number, isArray: true, example: [45] })
  @IsArray()
  @Type(() => Number)
  productIds: number[];

  @IsDateString()
  @ApiProperty({
    type: Date,
    example: '2024-11-30',
    description: 'YYYY-MM-DD',
    required: true,
  })
  redeemBefore: Date;

  @IsNumber()
  @ApiProperty({ type: Number, example: 200, required: true })
  maxDiscount: number;

  @IsNumber()
  @ApiProperty({ type: Number, example: 0, required: true })
  minCartValue: number;
}

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}

export class ValidateCouponDto extends PickType(CreateOrderDto, [
  'items',
  'coupon',
]) {}

export class ValidateCouponResponseDto {
  @ApiProperty({ type: Number, example: 100 })
  discount: number;

  @ApiProperty({ type: Number, example: 900 })
  discountedAmount: number;
}
