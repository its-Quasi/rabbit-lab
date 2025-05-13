import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_PAYMENTS_QUEUE, PAYMENT_QUEUE } from './constanst';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'payment_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: NOTIFICATION_PAYMENTS_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'notification_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
