import { ApiProperty } from '@nestjs/swagger';
import {
  IProduct,
  IProductAdditionalInfoTab,
  IProductAdditionalInfo,
} from '@repo/ui/types';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductAdditionalInfoTabDto
  implements Omit<IProductAdditionalInfoTab, 'images'>
{
  @ApiProperty({ type: String, example: '1 Player' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: String, example: '#FAFAFA' })
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @ApiProperty({ type: Number, isArray: true, example: [45] })
  @IsArray()
  @IsNotEmpty()
  imageIds: number[];
}

export class ProductAdditionalInfoDto
  implements Omit<IProductAdditionalInfo, 'tabs'>
{
  @ApiProperty({ type: String, example: 'How To Play', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String, example: '#FAFAFA', required: true })
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @ApiProperty({
    type: ProductAdditionalInfoTabDto,
    isArray: true,
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductAdditionalInfoTabDto)
  tabs: ProductAdditionalInfoTabDto[];
}

export class CreateProductDto
  implements
    Omit<
      IProduct,
      | 'id'
      | 'images'
      | 'benefits'
      | 'additionalInfo'
      | 'categories'
      | 'interests'
      | 'ages'
      | 'reviews'
      | 'createdAt'
      | 'updatedAt'
    >
{
  @ApiProperty({ type: String, example: 'Alphabet Adventure', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: 'Product description', required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number, example: 1000, required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: Number, example: 20, required: true })
  @IsNumber()
  @IsNotEmpty()
  discountPercentage: number;

  @ApiProperty({ type: Number, example: 800, required: true })
  @IsNumber()
  @IsNotEmpty()
  discountedPrice: number;

  @ApiProperty({ type: Boolean, example: true, required: true })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  bestSelling: boolean;

  @ApiProperty({ type: Boolean, example: true, required: true })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isComingSoon: boolean;

  @ApiProperty({ type: Boolean, example: true, required: true })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isNew: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, example: false })
  isComboOrGift: boolean;

  @ApiProperty({ type: Number, example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  minPlayers: number;

  @ApiProperty({ type: Number, example: 4, required: true })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  maxPlayers: number;

  @ApiProperty({
    type: String,
    example: 'Product More Ways To Play description',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  moreWaysToPlayDescription: string;

  @ApiProperty({
    example: 'https://example.com/url',
    description: 'Link to youtube video',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  moreWaysToPlayUrl: string;

  @ApiProperty({
    type: ProductAdditionalInfoDto,
    isArray: true,
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductAdditionalInfoDto)
  additionalInfo: ProductAdditionalInfoDto[];

  @ApiProperty({
    type: Number,
    isArray: true,
    example: [13, 14],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  categoryIds: number[];

  @ApiProperty({
    type: Number,
    isArray: true,
    example: [27, 28],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  interestIds: number[];

  @ApiProperty({ type: Number, isArray: true, example: [3, 7], required: true })
  @IsArray()
  @ArrayNotEmpty()
  ageIds: number[];

  @ApiProperty({
    type: Number,
    isArray: true,
    example: [39, 40],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  imageIds: number[];

  @ApiProperty({
    type: Number,
    isArray: true,
    example: [42, 43],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  benefitIds: number[];
}
