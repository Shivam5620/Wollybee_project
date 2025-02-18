import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCartItemDto } from './create-cart-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BulkAddCartItemsDto {
  @ApiProperty({
    type: [CreateCartItemDto],
    description: 'List of cart items to be added',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  items: CreateCartItemDto[];
}
