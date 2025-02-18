import { ApiProperty } from '@nestjs/swagger';
import { IProductCategory } from '@repo/ui/types';
import { Product } from '../../product/entities/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductCategory extends BaseEntity implements IProductCategory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ type: String, example: 'Shoes' })
  name: string;

  @Column({ default: '' })
  @ApiProperty({ type: String, example: 'Shoes' })
  description: string;

  @ManyToMany(() => Product, (product) => product.categories)
  @ApiProperty({ type: Product, isArray: true })
  products: Product[];

  @Column({ default: true })
  @ApiProperty({ type: Boolean, example: true })
  isActive: boolean;

  @Column({ default: false })
  @ApiProperty({ type: Boolean, example: false })
  isDeleted: boolean;

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
