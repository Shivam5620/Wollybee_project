import { PartialType } from '@nestjs/swagger';
import { CreateDealOfTheDayDto } from './create-deal-of-the-day.dto';

export class UpdateDealOfTheDayDto extends PartialType(CreateDealOfTheDayDto) {}
