import { Injectable } from '@nestjs/common';
import { CreateFaqDto, UpdateFaqDto } from '@repo/ui/dto/faq.dto';
import { Faq } from './entities/faq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { FaqCategoryService } from '../faq-category/faq-category.service';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,

    private readonly faqCategoryService: FaqCategoryService,
  ) {}

  async create(createFaqDto: CreateFaqDto) {
    const { categoryId } = createFaqDto;

    const faqCategory = await this.faqCategoryService.findOne({
      where: { id: categoryId },
    });

    if (!faqCategory) {
      throw new Error('FaqCategory not found');
    }

    const faq = this.faqRepository.create(createFaqDto);
    faq.category = faqCategory;

    return this.faqRepository.save(faq);
  }

  find(options?: FindManyOptions<Faq>) {
    return this.faqRepository.find({
      relations: ['category'],
      ...options,
    });
  }

  findOne(options: FindOneOptions<Faq>) {
    return this.faqRepository.findOne({
      relations: ['category'],
      ...options,
    });
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    const faq = await this.faqRepository.preload({
      id,
      ...updateFaqDto,
    });

    if (!faq) {
      throw new Error('Faq not found');
    }

    if (updateFaqDto.categoryId) {
      const faqCategory = await this.faqCategoryService.findOne({
        where: { id: updateFaqDto.categoryId },
      });
      if (!faqCategory) {
        throw new Error('FaqCategory not found');
      }
      faq.category = faqCategory;
      delete updateFaqDto.categoryId;
    }

    return this.faqRepository.update(id, updateFaqDto);
  }

  remove(id: number) {
    return this.faqRepository.delete(id);
  }
}
