import { ProductReviewStatus } from '@repo/ui/enums/productReview';
import { Product } from '../../product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(['user', 'product'], { unique: true })
export class ProductReview {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 'message' })
  message: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 5 })
  rating: number;

  @Column({ type: 'text', array: true, nullable: false, default: [] })
  @ApiProperty({
    example: [
      'https://localhost.com/productReview/1722678704600-FRONT-RENDER-scaled-e1719498489346.jpg',
    ],
  })
  media_urls: string[];

  @Column({ type: 'text', array: true, nullable: false, default: [] })
  @ApiProperty({
    example: [
      '/productReview/1722678704600-FRONT-RENDER-scaled-e1719498489346.jpg',
    ],
  })
  media_keys: string[];

  @Column({
    enum: ProductReviewStatus,
    nullable: false,
    default: ProductReviewStatus.APPROVAL_PENDING,
  })
  @ApiProperty({
    enum: ProductReviewStatus,
    example: ProductReviewStatus.APPROVAL_PENDING,
  })
  status: ProductReviewStatus;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @ManyToOne(() => User, (user) => user.productReviews)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
