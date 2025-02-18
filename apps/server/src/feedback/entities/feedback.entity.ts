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
import { IFeedback } from '@repo/ui/types/feedback';
import { Product } from '../../product/entities/product.entity';
import { FeedbackType } from '@repo/ui/enums/feedback';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Feedback extends BaseEntity implements IFeedback {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column()
  @ApiProperty({ type: String, example: 'I really like this product' })
  reason: string;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'feedback_products' })
  @ApiProperty({ type: [Product] })
  products: Product[];

  @Column({ enum: FeedbackType, type: 'enum' })
  @ApiProperty({ enum: FeedbackType, example: FeedbackType.ABANDONED_CART })
  type: FeedbackType;

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
