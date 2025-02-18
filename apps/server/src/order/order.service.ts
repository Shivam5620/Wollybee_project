import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  CreateOrderDto,
  GetOrdersQueryDto,
  UpdateOrderDto,
} from '@repo/ui/dto/order.dto';
import { Order } from './entities/order.entity';
import { Address } from '../address/entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityManager,
  FindOneOptions,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CouponService } from '../coupon/coupon.service';
import { ProductService } from '../product/product.service';
import { OrderItem } from './entities/order-item.entity';
import { UserService } from '../user/user.service';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { User } from 'src/user/entities/user.entity';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { CONFIGURATIONS } from '@repo/ui/lib/constants';
import { OrderPaymentMode } from '@repo/ui/enums/order';

// const select = {
//   id: true,
//   orderId: true,
//   totalAmount: true,
//   status: true,
//   address: {
//     fullName: true,
//     addressLine1: true,
//     addressLine2: true,
//     city: true,
//     state: true,
//     country: true,
//     postalCode: true,
//     phoneNumber: true,
//     additionalInstructions: true,
//     isDefault: true,
//   },
//   items: {
//     id: true,
//     price: true,
//     product: {
//       id: true,
//       name: true,
//     },
//     quantity: true,
//   },
//   coupon: true,
//   createdAt: true,
//   updatedAt: true,
// };

const relations = ['address', 'items', 'items.product'];

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly couponService: CouponService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly configurationService: ConfigurationService,
  ) {}

  async create(createOrderDto: CreateOrderDto, user?: User) {
    return await this.orderRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const { items } = createOrderDto;

        // Acquire minimum cart value for shipping and shipping charges

        const configurations = await this.configurationService.findAll({
          where: {
            key: In([
              CONFIGURATIONS.FREE_SHIPPING_CART_VALUE,
              CONFIGURATIONS.SHIPPING_PRICE,
              CONFIGURATIONS.CASH_ON_DELIVERY_CHARGES,
            ]),
          },
        });

        const freeShippingCartValue = configurations.find(
          (c) => c.key === CONFIGURATIONS.FREE_SHIPPING_CART_VALUE,
        );

        const shippingPrice = configurations.find(
          (c) => c.key === CONFIGURATIONS.SHIPPING_PRICE,
        );

        const codCharges = configurations.find(
          (c) => c.key === CONFIGURATIONS.CASH_ON_DELIVERY_CHARGES,
        );

        if (!shippingPrice || !freeShippingCartValue || !codCharges) {
          throw new BadRequestException('Configurations missing');
        }

        // Get productIds from items and fetch products
        const productIds = items.map((item) => item.productId);
        const products = await this.productService.findByIds(productIds, {
          relations: [],
        });

        if (products.length !== productIds.length) {
          throw new BadRequestException('Some products are invalid');
        }

        // ------------------------------------ SAVE AND SET ADDRESS ------------------------------------
        if (createOrderDto.address) {
          const address = transactionalEntityManager.create(
            Address,
            createOrderDto.address,
          );

          if (user) address.user = user;

          const savedAddress = await transactionalEntityManager.save(address);
          createOrderDto.address = savedAddress;
        } else if (createOrderDto.addressId) {
          const address = await transactionalEntityManager.findOne(Address, {
            where: { id: createOrderDto.addressId },
          });

          if (!address) {
            throw new BadRequestException('Address not found');
          }

          // Prevent user's to use other user's address
          if ((user && address.user.id !== user.id) || address.user == null) {
            throw new ForbiddenException('You cannot use this address');
          }

          createOrderDto.address = address;
        }

        // ------------------------------------- SAVE ORDER -------------------------------------
        // Generate order items
        const order = transactionalEntityManager.create(Order, createOrderDto);
        if (user) order.user = user;

        let totalAmount = 0;
        order.items = items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          totalAmount += product.discountedPrice * item.quantity;
          return transactionalEntityManager.create(OrderItem, {
            order,
            product,
            quantity: item.quantity,
            price: product.discountedPrice,
          });
        });

        if (totalAmount < Number(freeShippingCartValue.value)) {
          order.shippingCharges = Number(shippingPrice.value);
          totalAmount += order.shippingCharges;
        }

        // Add COD charges if applicable
        if (createOrderDto.paymentMode === OrderPaymentMode.CASH_ON_DELIVERY) {
          order.codCharges = Number(codCharges.value);
          totalAmount += order.codCharges;
        }

        order.totalAmount = totalAmount;
        order.address.user = user;

        // --------------------------------- VALIDATE COUPON AND APPLY DISCOUNTS ---------------------------------
        // Validate coupon
        if (createOrderDto.coupon && createOrderDto.coupon.length > 0) {
          const validateCouponRes =
            await this.couponService.validateCoupon(createOrderDto);

          order.discount = validateCouponRes.discount;
          order.discountedAmount = validateCouponRes.discountedAmount;
        } else {
          order.discount = 0;
          order.discountedAmount = totalAmount;
        }

        // Save order
        const savedOrder = await transactionalEntityManager.save(order);

        // Update order id with the generated order id
        order.orderId = `OD${savedOrder.id.toString().padStart(8, '0')}`;

        await transactionalEntityManager.save(order);

        // ----------------------------------- SAVE ORDER ITEMS -----------------------------------
        // Set the order id in each order item and save them
        order.items = order.items.map((item) => {
          item.order = savedOrder;
          return item;
        });

        await transactionalEntityManager.save(order.items);

        // Reload the order to include the relations
        return transactionalEntityManager.findOne(Order, {
          where: { id: savedOrder.id },
          relations: ['items', 'user', 'items.product'],
        });
      },
    );
  }

  findPaginated(
    options: IPaginationOptions,
    query: GetOrdersQueryDto,
    userId?: number,
  ) {
    const where: FindOptionsWhere<Order> = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.startDate) {
      const startDate = new Date(query.endDate);
      startDate.setHours(0, 0, 0, 0);
      where.createdAt = MoreThanOrEqual(startDate);
    }

    if (query.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);
      where.createdAt = LessThanOrEqual(endDate);
    }

    if (userId) {
      where.user = { id: userId };
    }

    return paginate<Order>(this.orderRepository, options, {
      where,
      relations,
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return this.orderRepository.update(id, updateOrderDto);
  }

  findOne(options: FindOneOptions<Order>) {
    return this.orderRepository.findOne({ relations, ...options });
  }
}
