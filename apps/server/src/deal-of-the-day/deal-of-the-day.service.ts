import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDealOfTheDayDto } from './dto/create-deal-of-the-day.dto';
import { UpdateDealOfTheDayDto } from './dto/update-deal-of-the-day.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DealOfTheDay } from './entities/deal-of-the-day.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { GetDealOfTheDayQueryDto } from './dto/get-deal-of-the-day.dto';

@Injectable()
export class DealOfTheDayService {
  constructor(
    @InjectRepository(DealOfTheDay)
    private readonly dealOfTheDayRepository: Repository<DealOfTheDay>,

    private readonly productService: ProductService,
  ) {}

  async create(createDealOfTheDayDto: CreateDealOfTheDayDto) {
    const { productIds } = createDealOfTheDayDto;

    const products = await this.productService.findByIds(productIds, {
      relations: [],
    });

    if (productIds.length !== products.length) {
      throw new NotFoundException('One or more products not found');
    }

    const dealOfTheDay = this.dealOfTheDayRepository.create({
      ...createDealOfTheDayDto,
      products,
    });

    return this.dealOfTheDayRepository.save(dealOfTheDay);
  }

  findAll(query: GetDealOfTheDayQueryDto) {
    return this.dealOfTheDayRepository.find({
      where: {
        date: query.date,
      },
      relations: ['products'],
      select: {
        id: true,
        date: true,
        products: {
          id: true,
          name: true,
        },
      },
    });
  }

  async getProductByDate(date: string) {
    const products = await this.dealOfTheDayRepository.findOne({
      where: { date },
      relations: ['product'],
    });

    return products;
  }

  async update(id: number, updateDealOfTheDayDto: UpdateDealOfTheDayDto) {
    const { productIds = [] } = updateDealOfTheDayDto;

    const dealOfTheDay = await this.dealOfTheDayRepository.findOne({
      where: { id },
    });

    if (!dealOfTheDay) {
      throw new NotFoundException('Deal of the day not found');
    }

    // Check if all products exist
    if (productIds.length > 0) {
      const products = await this.productService.findByIds(productIds, {
        relations: [],
      });

      if (productIds.length !== products.length) {
        throw new NotFoundException('One or more products not found');
      }

      dealOfTheDay.products = products;
    }

    Object.assign(dealOfTheDay, updateDealOfTheDayDto);

    return this.dealOfTheDayRepository.save(dealOfTheDay);
  }

  async remove(id: number) {
    const deleted = await this.dealOfTheDayRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new NotFoundException('Deal of the day not found');
    }
    return;
  }
}
