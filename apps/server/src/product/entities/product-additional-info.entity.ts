import { IProductAdditionalInfo } from '@repo/ui/types';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductAdditionalInfoTab } from './product-additional-info-tab.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductAdditionalInfo
  extends BaseEntity
  implements Omit<IProductAdditionalInfo, 'tabs'>
{
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ type: String, example: 'Product Additional Info' })
  title: string;

  @Column({ nullable: false })
  @ApiProperty({ type: String, example: '#FFFFFF' })
  color: string;

  @OneToMany(
    () => ProductAdditionalInfoTab,
    (additionalInfoTab) => additionalInfoTab.additionalInfo,
  )
  @ApiProperty({ type: () => ProductAdditionalInfoTab, isArray: true })
  tabs: ProductAdditionalInfoTab[];

  @ManyToOne(() => Product, (product) => product.additionalInfo, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Product })
  product: Product;

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
