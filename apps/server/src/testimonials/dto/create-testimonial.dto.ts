import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the customer providing the testimonial',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Great service!',
    description: 'The content of the testimonial message',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Optional image URL of the customer',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl: string;
}
