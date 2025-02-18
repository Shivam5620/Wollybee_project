import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { FaqCategoryModule } from '../faq-category/faq-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Faq]), FaqCategoryModule],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
