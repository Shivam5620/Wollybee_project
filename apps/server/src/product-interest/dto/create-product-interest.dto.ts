import { ApiProperty } from '@nestjs/swagger';
import { IProductInterest } from '@repo/ui/types';
import { IsHexColor, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductInterestDto
  implements
    Omit<
      IProductInterest,
      'id' | 'isActive' | 'isDeleted' | 'createdAt' | 'updatedAt' | 'file'
    >
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Early Learning',
    description: 'Name of the interest',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Early Learning',
    description: 'Description of the interest',
    required: true,
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  @ApiProperty({
    example: '#ffffff',
    description: 'Color',
    required: true,
  })
  color: string;

  @ApiProperty({
    example: 1,
    description: 'Image of the product interest',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  fileId: number;
}
