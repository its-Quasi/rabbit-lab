import { Controller, Get } from '@nestjs/common';
import { PaymentMsService } from './payment-ms.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PaymentMsController {
  constructor(private readonly paymentMsService: PaymentMsService) {}

  @Get()
  getHello(): string {
    return this.paymentMsService.getHello();
  }

  @MessagePattern('process-payment')
  async handlePaymentRequest(data: any) {
    // Handle the payment request here
    console.log('Received payment request:', data);
    // Simulate processing the payment
    const result = {
      status: 'success',
      message: 'Payment processed successfully',
    };
    return result;
  }
}
