import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import axios, { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { PaymentDto } from '@repo/ui/dto/payment.dto';
import { OrderService } from 'src/order/order.service';
import { OrderStatus } from '@repo/ui/enums/order';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly configService: ConfigService,
    private readonly orderService: OrderService,
  ) {}

  async initiatePayment(paymentRequestDto: PaymentDto): Promise<string> {
    const { name, mobile, amount, orderId } = paymentRequestDto;

    const order = await this.orderService.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (
      [OrderStatus.PAYMENT_SUCCESS, OrderStatus.CANCELLED].includes(
        order.status,
      )
    ) {
      throw new BadRequestException('Order already paid or cancelled');
    }

    const merchantId = this.configService.getOrThrow('PHONEPE_MERCHANT_ID');
    const redirectUrl = this.configService.getOrThrow('PHONEPE_REDIRECT_URL');
    const saltKey = this.configService.getOrThrow('PHONEPE_PUBLIC_SALT_KEY');
    const apiUrl = this.configService.getOrThrow('PHONEPE_API_URL');
    const keyIndex = this.configService.getOrThrow('PHONEPE_KEY_INDEX');
    const callbackUrl = this.configService.getOrThrow('PHONEPE_CALLBACK_URL');

    const merchantTransactionId =
      'MT' + crypto.randomBytes(8).toString('hex').toUpperCase();
    const merchantUserId =
      'MUID' + crypto.randomBytes(8).toString('hex').toUpperCase();

    const data = {
      merchantId,
      merchantTransactionId,
      merchantUserId,
      name,
      amount: Math.round(amount * 100),
      redirectUrl: redirectUrl + '?id=' + orderId,
      redirectMode: 'REDIRECT',
      callbackUrl: callbackUrl + '/' + orderId,
      mobileNumber: mobile,
      paymentInstrument: {
        type: 'PAY_PAGE',
        orderId,
      },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const stringToHash = `${payloadMain}/pg/v1/pay${saltKey}`;
    const sha256 = crypto
      .createHash('sha256')
      .update(stringToHash)
      .digest('hex');
    const checkSum = `${sha256}###${keyIndex}`;
    const endpoint = `${apiUrl}/pg/v1/pay`;

    const options: AxiosRequestConfig = {
      method: 'POST',
      url: endpoint,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checkSum,
      },
      data: { request: payloadMain },
    };

    try {
      const response = await axios(options);
      this.logger.debug('Payment Response Data:', response.data);
      return response.data.data.instrumentResponse.redirectInfo.url;
    } catch (error) {
      this.logger.error('Payment processing error', error);
      throw new InternalServerErrorException('Payment processing error');
    }
  }

  // async checkStatus(statusRequestDto: StatusRequestDto): Promise<any> {
  //   const { merchantTransactionId, merchantId } = statusRequestDto;
  //   const stringToHash = `/pg/v1/status/${merchantId}/${merchantTransactionId}${this.config.key}`;
  //   const sha256 = crypto
  //     .createHash('sha256')
  //     .update(stringToHash)
  //     .digest('hex');
  //   const checkSum = `${sha256}###${this.config.keyIndex}`;
  //   const endpoint = `${this.config.apiUrl}/pg/v1/status/${merchantId}/${merchantTransactionId}`;

  //   const options: AxiosRequestConfig = {
  //     method: 'GET',
  //     url: endpoint,
  //     headers: {
  //       'X-VERIFY': checkSum,
  //       'X-MERCHANT-ID': merchantId,
  //     },
  //   };

  //   try {
  //     const response = await axios(options);
  //     return response.data;
  //   } catch (error) {
  //     this.logger.error('Status checking error', error);
  //     throw new HttpException(
  //       'Error checking payment status',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async callback(id: number, data: any) {
    console.log('Called post webhook', data);

    const order = await this.orderService.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const decodedBody = Buffer.from(data.response, 'base64').toString('ascii');
    const parsedBody = JSON.parse(decodedBody);
    console.log({ parsedBody: JSON.stringify(parsedBody, null, 2) });

    let orderStatus: OrderStatus;
    if (parsedBody.success === true) {
      orderStatus = OrderStatus.PAYMENT_SUCCESS;
    } else {
      orderStatus = OrderStatus.PAYMENT_FAILED;
    }

    const parsedData = parsedBody.data ?? null;

    if (parsedData) {
      // Generate a transaction
      const transaction = this.paymentRepository.create({
        transactionId: parsedData.transactionId,
        merchantId: parsedData.merchantId,
        merchantTransactionId: parsedData.merchantTransactionId,
        amount: parsedData.amount / 100,
        state: parsedData.state,
        status: parsedBody.code,
        type: parsedData.paymentInstrument?.type,
        order,
      });

      await this.paymentRepository.save(transaction);
    }

    await this.orderService.update(id, { status: orderStatus });
    return parsedBody;
  }
}
