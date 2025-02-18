import { ApiProperty } from '@nestjs/swagger';
import { IProductCategory } from '@repo/ui/types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductCategoryDto
  implements
    Omit<
      IProductCategory,
      'id' | 'isActive' | 'isDeleted' | 'createdAt' | 'updatedAt'
    >
{
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @ApiProperty({
    example: 'Games',
    description: 'Name of the category',
    required: true,
  })
  name: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @IsNotEmpty()
  @ApiProperty({
    example: 'Description',
    description: 'Description of the category',
    required: true,
  })
  description: string;
}
