import { Entity, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '@repo/ui/enums/payment';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Payment {
  @ApiProperty({ description: 'Transaction identifier' })
  @Column({ primary: true })
  transactionId: string;

  @ApiProperty({ description: 'Merchant identifier' })
  @Column()
  merchantId: string;

  @ApiProperty({ description: 'Merchant transaction identifier' })
  @Column()
  merchantTransactionId: string;

  @ApiProperty({ description: 'Amount for the transaction', type: 'number' })
  @Column({ type: 'integer' })
  amount: number;

  @ApiProperty({ description: 'State of the transaction' })
  @Column()
  state: string;

  @ApiProperty({
    description: 'Current status of the transaction',
    enum: PaymentStatus,
  })
  @Column()
  status: string;

  @ApiProperty({ description: 'Type of the transaction', example: 'CARD' })
  @Column()
  type: string;

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: Date, example: '2020-01-01T00:00:00.000Z' })
  createdAt: Date;
}
