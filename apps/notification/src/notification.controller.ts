import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getHello(): string {
    return this.notificationService.getHello();
  }

  @MessagePattern('process-payment_notification')
  async handlePayment(@Payload() data: any) {
    console.log('Notification received:', data);
    // Handle the payment processing logic here...
  }
}
