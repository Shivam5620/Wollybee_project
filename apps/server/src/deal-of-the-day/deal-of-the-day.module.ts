import { Module } from '@nestjs/common';
import { DealOfTheDayService } from './deal-of-the-day.service';
import { DealOfTheDayController } from './deal-of-the-day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealOfTheDay } from './entities/deal-of-the-day.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([DealOfTheDay]), ProductModule],
  controllers: [DealOfTheDayController],
  providers: [DealOfTheDayService],
})
export class DealOfTheDayModule {}
