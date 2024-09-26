import { Global, Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqController } from './rabbitmq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { LocationsModule } from 'src/locations/locations.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
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
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // Conexão com RabbitMQ
          queue: 'emails', // Mesma fila que estamos consumindo
          queueOptions: {
            durable: true, // Persistência da fila
          },
        },
      },
    ]),
    NotificationsModule,
    UsersModule,
    RoomsModule,
    LocationsModule,
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
  controllers: [RabbitmqController], // Torna o RabbitmqService acessível globalmente
})
export class RabbitmqModule {}
