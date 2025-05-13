import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'notification_queue',
        queueOptions: { durable: true },
      },
    },
  );
  await app.listen();
  Logger.log(
    'Notification micro-service is running and ready to receive enqueued messages',
  );
}
bootstrap();
