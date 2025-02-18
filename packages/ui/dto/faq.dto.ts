import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IFaq } from '../types/faq';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto
  implements Omit<IFaq, 'category' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Question',
    example: 'What is Wollybee?',
  })
  question: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Answer',
    example: 'Wollybee is a platform to help you find the best products.',
  })
  answer: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number, description: 'Faq Category ID', example: 1 })
  categoryId: number;
}

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}
