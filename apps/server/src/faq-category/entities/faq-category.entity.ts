import { ApiProperty } from '@nestjs/swagger';
import { Faq } from '../../faq/entities/faq.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IFaqCategory } from '@repo/ui/types/faq';

@Entity()
export class FaqCategory implements Omit<IFaqCategory, 'faqs'> {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column()
  @ApiProperty({ type: String, example: 'Products & Services' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, example: 'https://example.com/faq/example.png' })
  imageUrl: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, example: '/faq/example.png' })
  imageKey: string;

  @OneToMany(() => Faq, (faq) => faq.category, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: Faq, isArray: true })
  faqs: Faq[];

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
