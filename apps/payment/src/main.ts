import { NestFactory } from '@nestjs/core';
import { PaymentMsModule } from './payment-ms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentMsModule,
    {
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'payment_queue',
        queueOptions: { durable: true },
      },
      transport: Transport.RMQ,
    },
  );
  await app.listen();
}
bootstrap();
