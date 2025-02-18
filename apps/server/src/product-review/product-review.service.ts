import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { ProductService } from '../product/product.service';
import { ProductReview } from './entities/product-review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { GetProductReviewQueryDto } from './dto/get-product-review.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: Repository<ProductReview>,

    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async create(createProductReviewDto: CreateProductReviewDto, user: User) {
    // Check if product is already reviewed by user
    const existingReview = await this.productReviewRepository.findOne({
      where: {
        user: { id: user.id },
        product: { id: createProductReviewDto.productId },
      },
    });

    if (existingReview) {
      throw new ConflictException('Product review already given by user');
    }

    // Check if product exists
    const product = await this.productService.findOne({
      where: { id: createProductReviewDto.productId },
      relations: [],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Create new product review
    const newProductReview = this.productReviewRepository.create({
      ...createProductReviewDto,
      user,
      product,
    });

    // Save product review
    return await this.productReviewRepository.save(newProductReview);
  }

  async getPaginatedReviews(
    options: IPaginationOptions,
    query: GetProductReviewQueryDto,
  ): Promise<Pagination<ProductReview>> {
    const where: FindOptionsWhere<ProductReview> = {};

    if (query.search) {
      where.message = ILike(`%${query.search}%`);
    }

    if (query.rating) {
      where.rating = query.rating;
    }

    if (query.status) {
      where.status = query.status;
    }

    return paginate<ProductReview>(this.productReviewRepository, options, {
      where,
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  getProductReviewsForProduct(productId: number) {
    return this.productReviewRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
    });
  }

  getProductReviewsForUser(userId: number) {
    return this.productReviewRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  findOne(options: FindOneOptions<ProductReview>) {
    return this.productReviewRepository.findOne(options);
  }

  async update(
    id: number,
    user: User,
    updateProductReviewDto: UpdateProductReviewDto,
  ) {
    const productReview = await this.productReviewRepository.findOne({
      where: { id },
    });

    if (productReview.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this review');
    }

    if (!productReview) {
      throw new NotFoundException(`Product Review with id ${id} not found`);
    }

    Object.assign(productReview, updateProductReviewDto);

    return await this.productReviewRepository.save(productReview);
  }

  async remove(id: number) {
    const deleted = await this.productReviewRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new NotFoundException(`Product Review with id ${id} not found`);
    }

    return;
  }
}
