import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICartItem } from '@repo/ui/types/cartItem';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(['user', 'product'], { unique: true })
export class CartItem
  extends BaseEntity
  implements Omit<ICartItem, 'product' | 'user'>
{
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ManyToOne(() => Product)
  @ApiProperty({ type: () => Product })
  product: Product;

  @ManyToOne(() => User, (user) => user.cart)
  @ApiProperty({ type: () => User })
  user: User;

  @Column({ nullable: false })
  @ApiProperty({ type: Number, example: 1 })
  quantity: number;

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
