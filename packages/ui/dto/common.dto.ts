import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetPaginatedQueryDto {
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
}
