import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CouponModule } from '../coupon/coupon.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { ConfigurationModule } from 'src/configuration/configuration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    CouponModule,
    ProductModule,
    UserModule,
    ConfigurationModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
