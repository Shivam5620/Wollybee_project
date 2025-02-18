import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Feedback } from '../entities/feedback.entity';
import { FeedbackType } from '@repo/ui/enums/feedback';

export class GetFeedbacksQueryDto {
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

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    name: 'type',
    example: FeedbackType.ABANDONED_CART,
    enum: FeedbackType,
    description: 'Type of feedback',
  })
  type?: FeedbackType;
}

export class GetFeedbacksDto {
  @ApiProperty({ type: Feedback, isArray: true })
  items: Feedback[];
}
