import { ApiProperty } from '@nestjs/swagger';
import { ProductReviewStatus } from '@repo/ui/enums/productReview';
import { IProductReview } from '@repo/ui/types/productReview';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductReviewDto
  implements Omit<IProductReview, 'product' | 'user'>
{
  @ApiProperty({ type: String, example: 'message', required: true })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: Number, example: 5, required: true })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({
    example: [
      'https://localhost.com/productReview/1722678704600-FRONT-RENDER-scaled-e1719498489346.jpg',
    ],
    description: 'Media file urls of review',
    type: 'array',
    items: {
      type: 'string',
    },
    required: false,
  })
  media_urls: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({
    example: [
      '/productReview/1722678704600-FRONT-RENDER-scaled-e1719498489346.jpg',
    ],
    description: 'Media file keys of review',
    type: 'array',
    items: {
      type: 'string',
    },
    required: false,
  })
  media_keys: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: ProductReviewStatus.APPROVAL_PENDING,
    description: 'Status of review',
    type: 'string',
    enum: ProductReviewStatus,
    required: true,
  })
  status: ProductReviewStatus;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 10 })
  productId: number;
}
