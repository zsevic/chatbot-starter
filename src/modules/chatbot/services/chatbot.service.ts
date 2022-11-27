import { Injectable } from '@nestjs/common';
import { TelegramContext, TelegramTypes } from 'bottender';
import { router, telegram } from 'bottender/router';
import { MessageService } from './message.service';

@Injectable()
export class ChatbotService {
  constructor(private readonly messageService: MessageService) {}

  private handleMessage = async (
    context: TelegramContext,
  ): Promise<TelegramTypes.Message> => {
    const response = await this.messageService.handleMessage(context);
    return this.say(context, response);
  };

  getRouter = () => {
    // @ts-ignore
    return router([telegram.message(this.handleMessage)]);
  };

  private say = async (
    context: TelegramContext,
    message: string,
  ): Promise<TelegramTypes.Message> => {
    const chatId = context.event._rawEvent.message?.chat?.id;
    return context.client.sendMessage(chatId, message);
  };
}
