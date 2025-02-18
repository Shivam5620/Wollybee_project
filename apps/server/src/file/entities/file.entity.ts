import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IFile } from '@repo/ui/types/file';
import { FileType } from '@repo/ui/enums/file';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class File extends BaseEntity implements IFile {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column()
  @ApiProperty({ type: String, example: 'banner' })
  name: string;

  @Column()
  @ApiProperty({ type: String, example: 'banner.png' })
  path: string;

  @Column()
  @ApiProperty({ type: String, example: 'https://example.com/banner.png' })
  url: string;

  @Column({ enum: FileType, type: 'enum', nullable: false })
  @ApiProperty({
    type: String,
    enum: FileType,
    enumName: 'FileType',
    example: FileType.banner,
  })
  type: FileType;

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
