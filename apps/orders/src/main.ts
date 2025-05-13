import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'order_queue',
        queueOptions: { durable: true },
      },
    },
  );
  await app.listen();
  Logger.log(
    'Order micro-service is running and ready to receive enqueued messages',
  );
}
bootstrap();
