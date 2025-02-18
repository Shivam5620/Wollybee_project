import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './address.dto';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderPaymentMode, OrderStatus } from '../enums/order';
import { GetPaginatedQueryDto } from './common.dto';

export class OrderItemDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number, example: 1, required: true })
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number, example: 1, required: true })
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @ApiProperty({ type: () => OrderItemDto, isArray: true, required: true })
  items: OrderItemDto[];

  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  @ValidateIf((o) => !o.addressId || o.address)
  @ApiProperty({ type: () => CreateAddressDto })
  address: CreateAddressDto;

  @IsInt()
  @IsNotEmpty()
  @ValidateIf((o) => !o.address || o.addressId)
  @ApiProperty({ type: () => Number })
  addressId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, example: 'OFF20', required: true })
  coupon: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: OrderPaymentMode.CASH_ON_DELIVERY,
    enum: OrderPaymentMode,
    required: true,
    description: 'Payment mode for the order',
  })
  paymentMode: OrderPaymentMode; // Payment mode can be 'COD', 'ONLINE', etc.
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    name: 'status',
    example: OrderStatus.PAYMENT_PENDING,
    enum: OrderStatus,
    enumName: 'OrderStatus',
    description: 'Status or order',
  })
  status?: OrderStatus;
}

export class GetOrdersQueryDto extends GetPaginatedQueryDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    name: 'status',
    example: OrderStatus.PAYMENT_PENDING,
    enum: OrderStatus,
    enumName: 'OrderStatus',
    description: 'Status or order',
  })
  status?: OrderStatus;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    name: 'startDate',
    example: '2022-01-01',
    description: 'Start Date to filter orders',
  })
  startDate?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    name: 'endDate',
    example: '2022-01-01',
    description: 'End Date Date to filter orders',
  })
  endDate?: string;
}
