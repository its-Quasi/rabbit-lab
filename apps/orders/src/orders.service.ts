import { Inject, Injectable } from '@nestjs/common';
import { PAYMENT_QUEUE, NOTIFICATION_PAYMENTS_QUEUE } from './constanst';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(PAYMENT_QUEUE) private readonly paymentClient: ClientProxy,
    @Inject(NOTIFICATION_PAYMENTS_QUEUE)
    private readonly notifPaymentClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  triggerPayment(data: any) {
    return this.paymentClient.emit('process-payment', data);
  }

  triggerNotification(data: any) {
    return this.notifPaymentClient.emit('process-payment_notification', data);
  }

  handleOrderCreated(data: any) {
    console.log('Order created event received:', data);
    // Handle the order creation logic here
    this.triggerNotification(data);
    this.triggerPayment(data);
    return { code: 201, message: 'Order created successfully', data };
  }
}
