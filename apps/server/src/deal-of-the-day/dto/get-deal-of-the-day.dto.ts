import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class GetDealOfTheDayQueryDto {
  @ApiPropertyOptional({
    description: 'The date for which to create the deal of the day',
    example: '2024-08-02',
  })
  @IsDateString()
  @IsOptional()
  date: string;
}

export class GetDealOfTheDayDto {
  @ApiProperty({
    description: 'The date for which to retrieve the deal of the day',
    example: '2024-08-02',
  })
  date: string;
}
