import { Injectable } from '@nestjs/common';
import {
  CreateFaqCategoryDto,
  UpdateFaqCategoryDto,
} from '@repo/ui/dto/faq-category.dto';
import { FaqCategory } from './entities/faq-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class FaqCategoryService {
  constructor(
    @InjectRepository(FaqCategory)
    private readonly faqCategoryRepository: Repository<FaqCategory>,
  ) {}

  create(createFaqCategoryDto: CreateFaqCategoryDto) {
    const faqCategory = this.faqCategoryRepository.create(createFaqCategoryDto);
    return this.faqCategoryRepository.save(faqCategory);
  }

  find(options?: FindManyOptions<FaqCategory>) {
    return this.faqCategoryRepository.find({
      relations: ['faqs'],
      ...options,
    });
  }

  findOne(options: FindOneOptions<FaqCategory>) {
    return this.faqCategoryRepository.findOne({
      relations: ['faqs'],
      ...options,
    });
  }

  async update(id: number, updateFaqCategoryDto: UpdateFaqCategoryDto) {
    const faqCategory = await this.faqCategoryRepository.preload({
      id,
      ...updateFaqCategoryDto,
    });

    if (!faqCategory) {
      throw new Error('FaqCategory not found');
    }

    return this.faqCategoryRepository.save(faqCategory);
  }

  remove(id: number) {
    return this.faqCategoryRepository.delete(id);
  }
}
