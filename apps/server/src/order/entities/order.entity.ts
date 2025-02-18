import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../../address/entities/address.entity';
import { OrderPaymentMode, OrderStatus } from '@repo/ui/enums/order';
import { IOrder } from '@repo/ui/types/order';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from '../../user/entities/user.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Entity()
export class Order implements Omit<IOrder, 'items'> {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @Column({ unique: true, nullable: true })
  orderId: string;

  @Column({ type: 'int', default: 0, unsigned: true, nullable: false })
  @ApiProperty({ type: Number, example: 1000 })
  totalAmount: number;

  @Column({ type: 'int', default: 0, unsigned: true, nullable: false })
  @ApiProperty({ type: Number, example: 1000 })
  discount: number;

  @Column({ type: 'int', default: 0, unsigned: true, nullable: false })
  @ApiProperty({ type: Number, example: 1000 })
  discountedAmount: number;

  @Column({ type: 'int', default: 0, unsigned: true, nullable: false })
  @ApiProperty({ type: Number, example: 50 })
  shippingCharges: number;

  @Column({ type: 'int', default: 0, unsigned: true, nullable: false })
  @ApiProperty({ type: Number, example: 40 })
  codCharges: number;

  @Column({
    type: 'enum',
    enum: OrderPaymentMode,
    default: OrderPaymentMode.CASH_ON_DELIVERY, // Default value, adjust as needed
  })
  @ApiProperty({
    enum: OrderPaymentMode,
    example: OrderPaymentMode.CASH_ON_DELIVERY,
  })
  paymentMode: OrderPaymentMode;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PAYMENT_PENDING,
  })
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PAYMENT_PENDING })
  status: OrderStatus;

  @Column({ nullable: true })
  @ApiProperty({ type: String, example: 'OFF20' })
  coupon: string;

  @ManyToOne(() => Address)
  @JoinColumn()
  @ApiProperty({ type: () => Address })
  address: Address;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @ManyToOne(() => User, (user) => user.orders)
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
