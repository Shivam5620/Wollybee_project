import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateDealOfTheDayDto {
  @IsDateString()
  @ApiProperty({
    type: 'string',
    format: 'date',
    example: '2024-11-30',
    description: 'YYYY-MM-DD',
  })
  date: string;

  @ApiProperty({ type: Number, isArray: true, example: [45] })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  productIds: number[];
}
