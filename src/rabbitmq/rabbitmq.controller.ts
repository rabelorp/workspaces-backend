import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class RabbitmqController {
  private readonly logger = new Logger(RabbitmqController.name);

  // Escutar o padrão 'notifications' para consumir mensagens da fila
  @MessagePattern('notifications')
  handleNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log(`Notification received: ${JSON.stringify(data)}`);

    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    // Confirmar o processamento da mensagem
    channel.ack(originalMessage);

    return data;
  }
}
