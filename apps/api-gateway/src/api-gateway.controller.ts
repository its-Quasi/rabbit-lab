import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE_RABBITMQ } from './constanst';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject(ORDER_SERVICE_RABBITMQ)
    private readonly client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @Post('orders')
  createOrder(@Body() order: any) {
    this.client.emit('order_created', order); // Emit the order_created event to RabbitMQ and send payload
    return { code: 201, message: 'Order created successfully', order };
  }
}
