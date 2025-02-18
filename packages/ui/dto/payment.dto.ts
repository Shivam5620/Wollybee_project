import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Mobile number of the user',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  mobile: string;

  @ApiProperty({
    description: 'Payment amount in smallest currency unit (e.g., rupees)',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Order Id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
