import {
  Controller,
  Post,
  Body,
  Headers,
  BadRequestException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentDto } from '@repo/ui/dto/payment.dto';
// import { StatusRequestDto } from '@repo/ui/dto/payment-status-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async initiatePayment(@Body() paymentRequestDto: PaymentDto) {
    return await this.paymentService.initiatePayment(paymentRequestDto);
  }

  // @Get('status/:merchantTransactionId/:merchantId')
  // async checkPaymentStatus(
  //   @Param('merchantTransactionId') merchantTransactionId: string,
  //   @Param('merchantId') merchantId: string,
  // ): Promise<any> {
  //   const statusRequestDto: StatusRequestDto = {
  //     merchantTransactionId,
  //     merchantId,
  //   };
  //   return await this.paymentService.checkStatus(statusRequestDto);
  // }

  @Post('callback/:orderId')
  async callback(
    @Body() requestDto: any,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Headers('x-verify') xVerify: string,
  ) {
    const keyIndex = this.configService.getOrThrow('PHONEPE_KEY_INDEX');
    const saltKey = this.configService.getOrThrow('PHONEPE_PUBLIC_SALT_KEY');

    // Step 1: Generate the hash
    const hash = createHash('sha256')
      .update(requestDto.response + saltKey)
      .digest('hex');

    const expectedChecksum = `${hash}###${keyIndex}`;

    // Step 2: Verify the hash with X-VERIFY header
    if (expectedChecksum !== xVerify) {
      throw new BadRequestException('Unauthorized');
    }

    return await this.paymentService.callback(orderId, requestDto);
  }
}
