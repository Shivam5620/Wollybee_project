import { IsString, IsNotEmpty } from 'class-validator';

export class StatusRequestDto {
  @IsString()
  @IsNotEmpty()
  merchantTransactionId: string;

  @IsString()
  @IsNotEmpty()
  merchantId: string;
}
