import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy, // Injeção do client RabbitMQ
  ) {}

  // Função para enviar mensagens para a fila 'notifications'
  sendNotification(message: any) {
    return this.client.emit('notifications', message); // Emite uma mensagem para a fila
  }
}
