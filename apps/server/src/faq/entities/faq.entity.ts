import { ApiProperty } from '@nestjs/swagger';
import { FaqCategory } from '../../faq-category/entities/faq-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Faq {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column()
  @ApiProperty({ type: String, example: 'What is Wollybee?' })
  question: string;

  @Column()
  @ApiProperty({
    type: String,
    example: 'Wollybee is a platform to help you find the best products.',
  })
  answer: string;

  @ManyToOne(() => FaqCategory, (faqCategory) => faqCategory.faqs, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => FaqCategory })
  category: FaqCategory;

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
