import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number) // Transform string to number
  @ApiProperty({ type: Number, example: 1, required: true })
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number) // Transform string to number
  @ApiProperty({ type: Number, example: 10, required: true })
  limit?: number = 10;
}
