import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product)
  @ApiProperty({ type: () => Product })
  product: Product;

  @Column()
  @ApiProperty({ type: Number, example: 1 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ type: Number, example: 9.99 })
  price: number;
}
