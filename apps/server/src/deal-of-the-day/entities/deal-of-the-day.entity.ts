import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DealOfTheDay extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ type: 'date', unique: true })
  @ApiProperty({
    type: String,
    example: '2022-01-01',
    description: 'YYYY-MM-DD',
  })
  date: string;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'deal_of_the_day_products' })
  @ApiProperty({ type: () => Product, isArray: true })
  products: Product[];
}
