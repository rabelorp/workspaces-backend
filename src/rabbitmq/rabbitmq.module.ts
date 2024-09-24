import { Global, Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqController } from './rabbitmq.controller';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // Conexão com RabbitMQ
          queue: 'notifications', // Mesma fila que estamos consumindo
          queueOptions: {
            durable: true, // Persistência da fila
          },
        },
      },
    ]),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
  controllers: [RabbitmqController], // Torna o RabbitmqService acessível globalmente
})
export class RabbitmqModule {}
