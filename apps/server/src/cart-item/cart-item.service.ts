import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CartAction } from '@repo/ui/enums/cart';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, createCartItemDto: CreateCartItemDto) {
    const { action, productId, quantity = 1 } = createCartItemDto;

    // Check if the cart item with productId and userId already exist in database
    const existingCartItem = await this.cartItemRepository.findOne({
      where: { product: { id: productId }, user: { id: userId } },
    });

    if (existingCartItem) {
      if (action === CartAction.ADD) {
        existingCartItem.quantity += quantity;
        return await this.cartItemRepository.save(existingCartItem);
      } else if (action === CartAction.REMOVE) {
        existingCartItem.quantity -= quantity;
        return await this.cartItemRepository.save(existingCartItem);
      }

      // Save the existing cart item
      return await this.cartItemRepository.save(existingCartItem);
    } else {
      // Create a new cart item and save it to the database
      const product = await this.productService.findOne({
        where: { id: productId },
        relations: [],
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const user = await this.userService.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const cartItem = this.cartItemRepository.create({
        product: { id: productId },
        user: { id: userId },
        quantity,
      });
      return await this.cartItemRepository.save(cartItem);
    }
  }

  async bulkAdd(
    userId: number,
    cartItemsDto: CreateCartItemDto[],
  ): Promise<void> {
    // Get existing cart items for the user
    const existingCartItems = await this.findCartItemsForUser(userId);

    const cartItems = [];
    // Loop through the cart items and update the quantity
    for (const item of cartItemsDto) {
      const existingCartItem = existingCartItems.find(
        (cartItem) => cartItem.productId === item.productId,
      );

      if (existingCartItem) continue;

      cartItems.push(
        this.cartItemRepository.create({
          product: { id: item.productId },
          user: { id: userId },
          quantity: item.quantity,
        }),
      );
    }

    // Save the cart items
    await this.cartItemRepository.save(cartItems);
  }

  findCartItemsForUser(userId: number) {
    return this.cartItemRepository
      .createQueryBuilder('cartItem')
      .leftJoin('cartItem.product', 'product')
      .where('cartItem.userId = :userId', { userId })
      .select([
        'cartItem.id AS id',
        'cartItem.quantity AS quantity',
        'product.id AS "productId"',
      ])
      .orderBy('cartItem.createdAt', 'ASC')
      .getRawMany();
  }

  async clearCart(userId: number) {
    await this.cartItemRepository.delete({
      user: { id: userId },
    });
    return;
  }

  async remove(userId: number, productId: number) {
    const deleted = await this.cartItemRepository.delete({
      user: { id: userId },
      product: { id: productId },
    });

    if (deleted.affected === 0) {
      throw new NotFoundException(
        `Cart Item with userId ${userId} and productId ${productId} not found`,
      );
    }

    return;
  }
}
