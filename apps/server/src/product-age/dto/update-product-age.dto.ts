import { PartialType } from '@nestjs/swagger';
import { CreateProductAgeDto } from './create-product-age.dto';

export class UpdateProductAgeDto extends PartialType(CreateProductAgeDto) {}
