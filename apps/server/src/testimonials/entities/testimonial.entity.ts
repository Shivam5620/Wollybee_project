import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ type: String, example: 'John Doe' })
  name: string;

  @Column({ type: 'text' })
  @ApiProperty({ type: String, example: 'Great service!' })
  message: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, example: 'https://example.com/image.jpg' })
  imageUrl: string;

  @Column({ default: new Date() })
  @ApiProperty({ type: Date, example: '2022-01-01T00:00:00.000Z' })
  createdAt: Date;
}
