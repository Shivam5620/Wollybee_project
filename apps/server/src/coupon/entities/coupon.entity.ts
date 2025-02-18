import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICoupon } from '@repo/ui/types/coupon';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Coupon extends BaseEntity implements ICoupon {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ type: String, example: '10OFF' })
  code: string;

  @Column()
  @ApiProperty({ type: String, example: '10% OFF' })
  description: string;

  @Column()
  @ApiProperty({ type: Number, example: 10 })
  discountPercentage: number;

  @Column()
  @ApiProperty({ type: Date, example: '2022-01-01T00:00:00.000Z' })
  redeemBefore: Date;

  @Column()
  @ApiProperty({ type: Number, example: 100 })
  maxDiscount: number;

  @Column({ default: 0 })
  @ApiProperty({ type: Number, example: 1000 })
  minCartValue: number;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'coupon_products' })
  @ApiProperty({ type: () => Product, isArray: true })
  products: Product[];

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
}
