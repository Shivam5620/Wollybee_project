import { Module } from '@nestjs/common';
import { FaqCategoryService } from './faq-category.service';
import { FaqCategoryController } from './faq-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqCategory } from './entities/faq-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FaqCategory])],
  controllers: [FaqCategoryController],
  providers: [FaqCategoryService],
  exports: [FaqCategoryService],
})
export class FaqCategoryModule {}
