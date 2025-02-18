import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { GetFeedbacksQueryDto } from './dto/get-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,

    private readonly productService: ProductService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const { productIds, ...feedbackData } = createFeedbackDto;

    const products = await this.productService.findByIds(productIds, {
      relations: [],
    });

    if (productIds.length !== products.length) {
      throw new NotFoundException('One or more products not found');
    }

    const feedback = this.feedbackRepository.create({
      ...feedbackData,
      products,
    });

    return this.feedbackRepository.save(feedback);
  }

  findAll(options: IPaginationOptions, query: GetFeedbacksQueryDto) {
    const where: FindOptionsWhere<Feedback> = {};

    if (query.search) {
      where.reason = ILike(`%${query.search}%`);
    }

    if (query.type) {
      where.type = query.type;
    }

    console.log({ where });
    return paginate<Feedback>(this.feedbackRepository, options, {
      where,
      relations: ['products'],
      select: {
        id: true,
        reason: true,
        type: true,
        products: {
          id: true,
          name: true,
        },
        createdAt: true,
        updatedAt: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.feedbackRepository.preload({
      id,
      ...updateFeedbackDto,
    });

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    return this.feedbackRepository.save(feedback);
  }

  async remove(id: number) {
    const feedback = await this.feedbackRepository.delete(id);

    if (feedback.affected === 0) {
      throw new NotFoundException('Feedback not found');
    }

    return;
  }
}
