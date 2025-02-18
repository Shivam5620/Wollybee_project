import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    // Create a new product category
    const newProductCategory = this.productCategoryRepository.create(
      createProductCategoryDto,
    );

    // Save the new product category
    return this.productCategoryRepository.save(newProductCategory);
  }

  findAll() {
    return this.productCategoryRepository.find();
  }

  async findOne(id: number) {
    // Find the product category
    const productCategory = await this.productCategoryRepository.findOne({
      where: { id },
    });

    // Check if the product category exists
    if (!productCategory) {
      throw new NotFoundException('Product category not found');
    }

    // Return the product category
    return productCategory;
  }

  findByIds(ids: number[]) {
    return this.productCategoryRepository.find({ where: { id: In(ids) } });
  }

  async update(
    id: number,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    const updated = await this.productCategoryRepository.update(
      { id },
      updateProductCategoryDto,
    );

    if (updated.affected === 0) {
      throw new NotFoundException('Product category not found');
    }

    return this.productCategoryRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    // Delete the product category
    const deleted = await this.productCategoryRepository.delete({ id });

    // Check if the product category exists
    if (deleted.affected === 0) {
      throw new NotFoundException('Product category not found');
    }

    return;
  }
}
