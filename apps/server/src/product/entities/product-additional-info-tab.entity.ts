import { File } from '../../file/entities/file.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductAdditionalInfo } from './product-additional-info.entity';
import { IProductAdditionalInfoTab } from '@repo/ui/types/product';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductAdditionalInfoTab
  extends BaseEntity
  implements Omit<IProductAdditionalInfoTab, 'images'>
{
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ type: String, example: 'Tab 1' })
  title: string;

  @Column({ nullable: false })
  @ApiProperty({ type: String, example: '#FFFFFF' })
  color: string;

  @Column({ nullable: false })
  @ApiProperty({ type: String, example: 'Tab 1 description' })
  description: string;

  @ManyToMany(() => File)
  @JoinTable({
    name: 'product_additional_info_tab_image',
  })
  @ApiProperty({ type: () => File, isArray: true })
  images: File[];

  @ManyToOne(
    () => ProductAdditionalInfo,
    (additionalInfo) => additionalInfo.tabs,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @ApiProperty({ type: () => ProductAdditionalInfo })
  additionalInfo: ProductAdditionalInfo;

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
