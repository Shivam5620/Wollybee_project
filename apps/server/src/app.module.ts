import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { validate } from './env.validation';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductInterestModule } from './product-interest/product-interest.module';
import { ProductAgeModule } from './product-age/product-age.module';
import { BannerModule } from './banner/banner.module';
import { FileModule } from './file/file.module';
import { ProductModule } from './product/product.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductReviewModule } from './product-review/product-review.module';
import { DealOfTheDayModule } from './deal-of-the-day/deal-of-the-day.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { CouponModule } from './coupon/coupon.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { FaqCategoryModule } from './faq-category/faq-category.module';
import { FaqModule } from './faq/faq.module';
import { PaymentModule } from './payment/payment.module';
import { TestimonialModule } from './testimonials/testimonial.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: '../../.env',
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 60,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    FileModule,
    BannerModule,
    ProductCategoryModule,
    ProductInterestModule,
    ProductAgeModule,
    ProductModule,
    CartItemModule,
    ProductReviewModule,
    DealOfTheDayModule,
    FeedbackModule,
    ConfigurationModule,
    CouponModule,
    AddressModule,
    OrderModule,
    FaqCategoryModule,
    FaqModule,
    PaymentModule,
    TestimonialModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
