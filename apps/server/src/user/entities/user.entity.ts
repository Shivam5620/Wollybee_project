import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from '@repo/ui/types';
import * as bcrypt from 'bcrypt';
import { Role } from '../../role/entities/role.entity';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { ProductReview } from '../../product-review/entities/product-review.entity';
import { Address } from '../../address/entities/address.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../order/entities/order.entity';
import { Length, MaxLength, MinLength } from 'class-validator';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({})
  @ApiProperty({ type: String, example: 'John Doe' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ type: String, example: 'johndoe' })
  email: string;

  @Column({ unique: true, nullable: true, length: 10 })
  @ApiProperty({ type: String, example: '9876543210' })
  @Length(10, 10)
  @MinLength(10, { message: 'Mobile number must be at least 10 digits long' })
  @MaxLength(10, { message: 'Mobile number must be at most 10 digits long' })
  mobile: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @ManyToOne(() => Role, (role) => role.users)
  @ApiProperty({ type: () => Role })
  role: Role;

  @OneToMany(() => ProductReview, (review) => review.user)
  productReviews: ProductReview[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({ default: true })
  @ApiProperty({ type: Boolean, example: true })
  isActive: boolean;

  @Column({ default: false })
  @ApiProperty({ type: Boolean, example: false })
  isDeleted: boolean;

  @OneToMany(() => CartItem, (cart) => cart.user)
  cart: CartItem;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2020-01-01T00:00:00.000Z' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2020-01-01T00:00:00.000Z' })
  updatedAt: Date;

  // Extra keys not required in Entity
  permissions: string[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
