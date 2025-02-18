import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCouponDto,
  UpdateCouponDto,
  ValidateCouponDto,
  ValidateCouponResponseDto,
} from '@repo/ui/dto/coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import {
  FindManyOptions,
  FindOneOptions,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,

    private readonly productService: ProductService,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    const { productIds } = createCouponDto;

    const products = await this.productService.findByIds(productIds, {
      relations: [],
      select: {
        id: true,
        name: true,
      },
    });

    if (productIds.length !== products.length) {
      throw new NotFoundException('One or more products not found');
    }

    const coupon = this.couponRepository.create({
      ...createCouponDto,
      products,
    });

    return this.couponRepository.save(coupon);
  }

  findAll(options: FindManyOptions<Coupon> = {}) {
    if (!options.relations) options.relations = ['products'];

    if (!options.select)
      options.select = {
        id: true,
        code: true,
        description: true,
        discountPercentage: true,
        redeemBefore: true,
        maxDiscount: true,
        minCartValue: true,
        products: {
          id: true,
          name: true,
        },
      };
    return this.couponRepository.find(options);
  }

  findOne(options: FindOneOptions<Coupon>) {
    if (!options.relations) options.relations = ['products'];

    if (!options.select)
      options.select = {
        id: true,
        code: true,
        description: true,
        discountPercentage: true,
        redeemBefore: true,
        maxDiscount: true,
        minCartValue: true,
        products: {
          id: true,
          name: true,
        },
      };
    return this.couponRepository.findOne(options);
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponRepository.preload({
      id,
      ...updateCouponDto,
    });

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    const { productIds } = updateCouponDto;
    if (productIds.length) {
      const products = await this.productService.findByIds(productIds, {
        relations: [],
      });

      if (productIds.length !== products.length) {
        throw new NotFoundException('One or more products not found');
      }

      coupon.products = products;
    }

    return this.couponRepository.save(coupon);
  }

  async remove(id: number) {
    const deleted = await this.couponRepository.delete(id);

    if (deleted.affected === 0) {
      throw new NotFoundException('Coupon not found');
    }

    return;
  }

  async validateCoupon(
    order: ValidateCouponDto,
  ): Promise<ValidateCouponResponseDto> {
    const { coupon: couponCode, items } = order;

    const coupon = await this.findOne({
      where: { code: couponCode, redeemBefore: MoreThanOrEqual(new Date()) },
      relations: ['products'],
    });

    if (!coupon) {
      throw new BadRequestException('Invalid coupon code');
    }

    // TODO: If the total amount of discounted products is less than the discount to be applied, then the value of that products should be discounted

    // Get products from order
    const productIds = items.map((item) => item.productId);
    const orderProducts = await this.productService.findByIds(productIds, {
      relations: [],
    });

    let orderTotal = 0;
    for (const item of items) {
      const product = orderProducts.find((p) => p.id === item.productId);
      orderTotal += product.discountedPrice * item.quantity;
    }

    // Check minimum cart value
    if (orderTotal < coupon.minCartValue) {
      throw new BadRequestException(
        `Order total must be at least ${coupon.minCartValue} to apply this coupon`,
      );
    }

    // Filter applicable products
    let applicableProducts = [];
    if (coupon.products.length > 0) {
      applicableProducts = orderProducts.filter((product) =>
        coupon.products.some((cp) => cp.id === product.id),
      );
    }

    if (coupon.products.length && applicableProducts.length === 0) {
      throw new BadRequestException('No applicable products for this coupon');
    }

    const discount = Math.min(
      (orderTotal * coupon.discountPercentage) / 100,
      coupon.maxDiscount,
    );

    return {
      discount,
      discountedAmount: orderTotal - discount,
    };
  }
}
