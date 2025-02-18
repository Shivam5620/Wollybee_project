import { Module } from '@nestjs/common';
import { ProductInterestService } from './product-interest.service';
import { ProductInterestController } from './product-interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInterest } from './entities/product-interest.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInterest]), FileModule],
  controllers: [ProductInterestController],
  providers: [ProductInterestService],
  exports: [ProductInterestService],
})
export class ProductInterestModule {}
