import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductReviewStatus } from '@repo/ui/enums/productReview';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ProductReview } from '../entities/product-review.entity';

export class GetProductReviewQueryDto {
  @ApiPropertyOptional({
    name: 'search',
    required: false,
    example: 'hello',
    type: String,
    description: 'Search term',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    name: 'page',
    example: 1,
    type: Number,
    description: 'Page number',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    name: 'limit',
    example: 10,
    type: Number,
    description: 'Number of items per page',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    name: 'rating',
    example: 1,
    enum: [1, 2, 3, 4, 5],
    type: Number,
    description: 'Rating filter',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    name: 'status',
    example: ProductReviewStatus.APPROVAL_PENDING,
    enum: ProductReviewStatus,
    description: 'Status filter',
  })
  status?: ProductReviewStatus;
}

export class GetProductReviewsDto {
  @ApiProperty({ type: () => ProductReview, isArray: true })
  items: ProductReview[];
}
