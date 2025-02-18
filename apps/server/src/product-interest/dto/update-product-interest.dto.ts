import { PartialType } from '@nestjs/swagger';
import { CreateProductInterestDto } from './create-product-interest.dto';

export class UpdateProductInterestDto extends PartialType(
  CreateProductInterestDto,
) {}
