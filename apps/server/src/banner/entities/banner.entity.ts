import { BannerType } from '@repo/ui/enums/banner';
import { IBanner } from '@repo/ui/types';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../file/entities/file.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Banner
  extends BaseEntity
  implements Omit<IBanner, 'file' | 'mobileFile'>
{
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column()
  @ApiProperty({ type: String, example: 'Banner 1' })
  title: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, example: '/product/20' })
  url: string;

  @Column()
  @ApiProperty({ type: String, example: 'Banner 1' })
  description: string;

  @Column({ enum: BannerType, type: 'enum' })
  @ApiProperty({
    type: String,
    enum: BannerType,
    enumName: 'BannerType',
    example: BannerType.home,
  })
  type: BannerType;

  @ManyToOne(() => File, { nullable: false })
  @ApiProperty({ type: () => File })
  file: File;

  @ManyToOne(() => File, { nullable: false })
  @ApiProperty({ type: () => File })
  mobileFile: File;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2022-05-10T08:00:00.000Z' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2022-05-10T08:00:00.000Z' })
  updatedAt: Date;
}
