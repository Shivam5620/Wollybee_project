import { ApiProperty } from '@nestjs/swagger';
import { FeedbackType } from '@repo/ui/enums/feedback';
import { IFeedback } from '@repo/ui/types/feedback';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDto implements Omit<IFeedback, 'products'> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'I am not satisfied with my purchase',
    description: 'Reason for the feedback',
  })
  reason: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: FeedbackType.ABANDONED_CART,
    description: 'Type of the feedback',
    type: 'string',
    enum: FeedbackType,
    required: true,
  })
  type: FeedbackType;

  @ApiProperty({ type: Number, isArray: true, example: [45] })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  productIds: number[];
}
