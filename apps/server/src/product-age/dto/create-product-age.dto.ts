import { ApiProperty } from '@nestjs/swagger';
import { IProductAge } from '@repo/ui/types';
import { IsHexColor, IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductAgeDto
  implements
    Omit<
      IProductAge,
      'id' | 'isActive' | 'isDeleted' | 'createdAt' | 'updatedAt' | 'file'
    >
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '0-2 years',
    description: 'Name of the interest',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  @ApiProperty({
    example: '#ffffff',
    description: 'Color',
    required: true,
  })
  color: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
    description: 'Min Age',
    required: true,
  })
  min: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 2,
    description: 'Max Age',
    required: true,
  })
  max: number;

  @ApiProperty({
    example: 1,
    description: 'Image of the product interest',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  fileId: number;
}
