import { ApiProperty } from '@nestjs/swagger';
import { ConfigurationType } from '@repo/ui/enums/configuration';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Configuration extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column()
  @ApiProperty({ type: String, example: 'FEEDBACK_OPTIONS' })
  key: string;

  @Column({ type: 'enum', enum: ConfigurationType })
  @ApiProperty({
    type: String,
    enum: ConfigurationType,
    enumName: 'ConfigurationType',
    example: ConfigurationType.STRING_ARRAY,
  })
  type: ConfigurationType;

  @Column()
  @ApiProperty({
    type: String,
    example: '["I want to add or modify items in my cart"]',
  })
  value: string;

  @Column({ nullable: true })
  @ApiProperty({
    type: String,
    example: 'Used to set the options in feedback',
  })
  description: string;

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
