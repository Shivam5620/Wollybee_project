import { IProduct } from '@repo/ui/types/product';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../../product-category/entities/product-category.entity';
import { ProductInterest } from '../../product-interest/entities/product-interest.entity';
import { ProductAge } from '../../product-age/entities/product-age.entity';
import { File } from '../../file/entities/file.entity';
import { ProductAdditionalInfo } from './product-additional-info.entity';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { ProductReview } from '../../product-review/entities/product-review.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product
  extends BaseEntity
  implements
    Omit<
      IProduct,
      'additionalInfo' | 'images' | 'benefits' | 'ages' | 'reviews'
    >
{
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ type: String, example: 'Product Name' })
  name: string;

  @Column({ nullable: false })
  @ApiProperty({ type: String, example: 'Product Description' })
  description: string;

  @Column({ nullable: false, default: 0 })
  @ApiProperty({ type: Number, example: 100 })
  price: number;

  @Column({ nullable: false, default: 0 })
  @ApiProperty({ type: Number, example: 10 })
  discountPercentage: number;

  @Column({ nullable: false, default: 0 })
  @ApiProperty({ type: Number, example: 90 })
  discountedPrice: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  @ApiProperty({ type: Boolean, example: true })
  bestSelling: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  @ApiProperty({ type: Boolean, example: true })
  isComingSoon: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  @ApiProperty({ type: Boolean, example: true })
  isNew: boolean;

  @Column({ default: false })
  @ApiProperty({ type: Boolean, example: false })
  isComboOrGift: boolean;

  @Column({ default: 1 })
  @ApiProperty({ type: Number, example: 1 })
  minPlayers: number;

  @Column({ nullable: true, default: null })
  @ApiProperty({ type: Number, example: 4 })
  maxPlayers: number;

  @ManyToMany(() => File)
  @JoinTable({
    name: 'product_product_image',
  })
  @ApiProperty({ type: () => File, isArray: true })
  images: File[];

  @ManyToMany(() => File)
  @JoinTable({
    name: 'product_product_benefit',
  })
  @ApiProperty({ type: () => File, isArray: true })
  benefits: File[];

  @Column({ nullable: true })
  @ApiProperty({ type: String, example: 'Play with friends' })
  moreWaysToPlayDescription: string;

  @Column({ nullable: true })
  @ApiProperty({ type: () => String, example: 'https://example.com' })
  moreWaysToPlayUrl: string;

  @ManyToMany(() => ProductAge, (age) => age.products)
  @JoinTable({
    name: 'product_product_age',
  })
  @ApiProperty({ type: () => ProductAge, isArray: true })
  ages: ProductAge[];

  @ManyToMany(() => ProductCategory, (category) => category.products)
  @JoinTable({
    name: 'product_product_category',
  })
  @ApiProperty({ type: () => ProductCategory, isArray: true })
  categories: ProductCategory[];

  @ManyToMany(() => ProductInterest, (interest) => interest.products)
  @JoinTable({
    name: 'product_product_interest',
  })
  @ApiProperty({ type: () => ProductInterest, isArray: true })
  interests: ProductInterest[];

  @OneToMany(
    () => ProductAdditionalInfo,
    (additionalInfo) => additionalInfo.product,
  )
  @ApiProperty({ type: () => ProductAdditionalInfo, isArray: true })
  additionalInfo: ProductAdditionalInfo[];

  @OneToMany(() => ProductReview, (review) => review.product)
  @ApiProperty({ type: () => ProductReview, isArray: true })
  reviews: ProductReview[];

  @OneToMany(() => CartItem, (cart) => cart.product)
  cart: CartItem;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2022-01-01T00:00:00.000Z' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2022-01-01T00:00:00.000Z' })
  updatedAt: Date;

  // Additional fields not used in db
  @ApiProperty({ type: Number, example: 100 })
  reviewCount: number;

  @ApiProperty({ type: Number, example: 4 })
  averageRating: number;
}
