import { ApiProperty } from '@nestjs/swagger';
import { CartAction } from '@repo/ui/enums/cart';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({
    example: CartAction.ADD,
    description: 'Action to be performed on cart. Increment or decrement',
    type: 'string',
    enum: CartAction,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  action: CartAction;

  @ApiProperty({ type: Number, example: 10 })
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
