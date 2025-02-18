import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IFaqCategory } from '../types/faq';
import { IsNotEmpty, IsSemVer, IsString } from 'class-validator';

export class CreateFaqCategoryDto
  implements Omit<IFaqCategory, 'createdAt' | 'updatedAt' | 'faqs'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Name of the category',
    example: 'Products & Services',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Url of image',
    example: 'https://example.com/faq/example.png',
  })
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Key of the image when uploaded to S3',
    example: '/faq/example.png',
  })
  imageKey: string;
}

export class UpdateFaqCategoryDto extends PartialType(CreateFaqCategoryDto) {}
