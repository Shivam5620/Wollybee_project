import { ApiProperty } from '@nestjs/swagger';
import { IProductAge } from '@repo/ui/types';
import { File } from '../../file/entities/file.entity';
import { Product } from '../../product/entities/product.entity';
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

@Entity()
export class ProductAge extends BaseEntity implements IProductAge {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ unique: true, nullable: false })
  @ApiProperty({ type: String, example: '1-2 years' })
  name: string;

  @Column({ nullable: false })
  @ApiProperty({ type: String, example: '#FFFFFF' })
  color: string;

  @Column({ default: 0, nullable: false })
  @ApiProperty({ type: Number, example: 1 })
  min: number;

  @Column({ default: 0, nullable: false })
  @ApiProperty({ type: Number, example: 2 })
  max: number;

  @ManyToOne(() => File, { nullable: false })
  @ApiProperty({ type: () => File })
  file: File;

  @ManyToMany(() => Product, (product) => product.ages)
  @ApiProperty({ type: () => Product, isArray: true })
  products: Product[];

  @Column({ default: true, nullable: false })
  @ApiProperty({ type: Boolean, example: true })
  isActive: boolean;

  @Column({ default: false, nullable: false })
  @ApiProperty({ type: Boolean, example: false })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  @ApiProperty({ type: Date, example: '2022-01-01T00:00:00.000Z' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  @ApiProperty({ type: Date, example: '2022-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
