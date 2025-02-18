import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IAddress } from '@repo/ui/types/address';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AddressType } from '@repo/ui/enums/address';

@Entity()
export class Address implements IAddress {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ type: String, example: 'John Doe' })
  fullName: string;

  @Column({ length: 255 })
  @ApiProperty({ type: String, example: '123 Main St' })
  addressLine1: string;

  @Column({ length: 255, nullable: true })
  @ApiProperty({ type: String, example: 'Apt 2' })
  addressLine2?: string;

  @Column({ length: 100 })
  @ApiProperty({ type: String, example: 'New York' })
  city: string;

  @Column({ length: 100 })
  @ApiProperty({ type: String, example: 'NY' })
  state: string;

  @Column({ length: 100 })
  @ApiProperty({ type: String, example: 'USA' })
  country: string;

  @Column({ length: 20 })
  @ApiProperty({ type: String, example: '10001' })
  postalCode: string;

  @Column({ length: 15 })
  @ApiProperty({ type: String, example: '1234567890' })
  phoneNumber: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, example: 'Delivery instructions' })
  additionalInstructions?: string;

  @Column({ default: false })
  @ApiProperty({ type: Boolean, example: true })
  isDefault: boolean;

  @Column({ nullable: true })
  @ApiProperty({ type: String, example: 'user@example.com' })
  email: string;

  @Column({
    type: 'enum',
    enum: AddressType,
  })
  @ApiProperty({ enum: AddressType, example: AddressType.HOME })
  type: AddressType;
  default: AddressType.HOME;

  @ManyToOne(() => User, (user) => user.addresses)
  @ApiProperty({ type: () => User })
  user: User;

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
