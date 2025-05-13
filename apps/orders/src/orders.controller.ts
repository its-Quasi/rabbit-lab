import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @MessagePattern('order_created')
  async handleOrderCreated(@Payload() data: any) {
    this.ordersService.handleOrderCreated(data);
  }
}
