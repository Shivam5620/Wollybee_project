import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductAge } from '../../product-age/entities/product-age.entity';
import { ProductCategory } from '../../product-category/entities/product-category.entity';
import { ProductInterest } from '../../product-interest/entities/product-interest.entity';
import { GetPaginatedQueryDto } from '@repo/ui/dto/common.dto';
import {
  IsArray,
  IsInt,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductFilterPrice {
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @ApiProperty({ type: Number, example: 1 })
  min: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  @ApiProperty({ type: Number, example: 100 })
  max: number;
}

export class GetProductFilterDto {
  @ApiProperty({ type: ProductCategory, isArray: true })
  categories: ProductCategory[];

  @ApiProperty({ type: ProductAge, isArray: true })
  ages: ProductAge[];

  @ApiProperty({ type: ProductInterest, isArray: true })
  interests: ProductInterest[];

  @ApiProperty({ type: ProductFilterPrice, isArray: true })
  prices: ProductFilterPrice[];
}

export class GetProductsQueryDto extends GetPaginatedQueryDto {
  @ApiPropertyOptional({
    type: Number,
    name: 'categoryIds[]',
    isArray: true,
    example: [13, 14],
    required: true,
  })
  @IsArray()
  @IsOptional()
  categoryIds: number[];

  @ApiPropertyOptional({
    type: Number,
    name: 'interestIds[]',
    isArray: true,
    example: [27, 28],
    required: true,
  })
  @IsArray()
  @IsOptional()
  interestIds: number[];

  @ApiPropertyOptional({
    type: Number,
    name: 'ageIds[]',
    isArray: true,
    example: [3, 7],
    required: true,
  })
  @IsArray()
  @IsOptional()
  ageIds: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true }) // Validate each object in the array
  @Type(() => ProductFilterPrice) // Transform each element to ProductFilterPrice
  @ApiPropertyOptional({
    type: [ProductFilterPrice],
    name: 'prices[]',
    isArray: true,
    description:
      'Array of price ranges where each range is an object with min and max values',
    example: [
      { min: 0, max: 499 },
      { min: 1000, max: 1499 },
    ],
  })
  prices: ProductFilterPrice[];
}
