import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { ProductAgeModule } from '../product-age/product-age.module';
import { ProductInterestModule } from '../product-interest/product-interest.module';
import { FileModule } from '../file/file.module';
import { ProductAdditionalInfo } from './entities/product-additional-info.entity';
import { ProductAdditionalInfoTab } from './entities/product-additional-info-tab.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductAdditionalInfo,
      ProductAdditionalInfoTab,
    ]),
    FileModule,
    ProductCategoryModule,
    ProductAgeModule,
    ProductInterestModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
