import { Module } from '@nestjs/common';
import { ProductAgeService } from './product-age.service';
import { ProductAgeController } from './product-age.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAge } from './entities/product-age.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAge]), FileModule],
  controllers: [ProductAgeController],
  providers: [ProductAgeService],
  exports: [ProductAgeService],
})
export class ProductAgeModule {}
