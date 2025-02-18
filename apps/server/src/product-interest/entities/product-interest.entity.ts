import { IProductInterest } from '@repo/ui/types';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../file/entities/file.entity';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductInterest extends BaseEntity implements IProductInterest {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ type: String, example: 'test' })
  name: string;

  @Column({ default: '' })
  @ApiProperty({ type: String, example: 'test' })
  description: string;

  @Column({ default: '' })
  @ApiProperty({ type: String, example: 'test' })
  color: string;

  @ManyToOne(() => File, { nullable: false })
  @ApiProperty({ type: () => File })
  file: File;

  @ManyToMany(() => Product, (product) => product.interests)
  @ApiProperty({ type: () => Product, isArray: true })
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
  @ApiProperty({ type: Date })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
