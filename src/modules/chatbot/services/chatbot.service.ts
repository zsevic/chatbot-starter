import { Injectable, Logger } from '@nestjs/common';
import { MessengerContext } from 'bottender';
import { messenger, platform, router } from 'bottender/router';
import { DEFAULT_MESSENGER_LOCALE } from 'common/config/constants';
import { GET_STARTED_PAYLOAD } from 'modules/chatbot/chatbot.constants';
import { ChatbotController } from 'modules/chatbot/chatbot.controller';
import {
  isButtonTemplate,
  isGenericTemplate,
  isQuickReplyTemplate,
} from 'modules/chatbot/chatbot.type-guards';
import { Message } from 'modules/chatbot/chatbot.types';
import { getUserOptions } from 'modules/chatbot/chatbot.utils';
import { UserService } from 'modules/user/user.service';
import { ResponseService } from './response.service';

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);

  constructor(
    private readonly controller: ChatbotController,
    private readonly responseService: ResponseService,
    private readonly userService: UserService,
  ) {}

  private asyncWrap = (fn) => async (context: MessengerContext) => {
    const userOptions = getUserOptions(context);
    const user = await this.userService.validateUser(userOptions);

    if (!user && context.event.postback?.payload !== GET_STARTED_PAYLOAD) {
      const {
        locale = DEFAULT_MESSENGER_LOCALE,
      } = await context.getUserProfile({ fields: ['locale'] });

      const response = await this.responseService.getRegisterUserFailureResponse(
        locale,
      );
      return this.say(context, response);
    }

    const response = await fn(context);
    return this.say(context, response);
  };

  getRouter = () => router([platform('messenger', this.handleMessenger)]);

  private handleMessenger = () =>
    router([
      messenger.message(this.asyncWrap(this.controller.messageHandler)),
      messenger.postback(this.asyncWrap(this.controller.postbackHandler)),
    ]);

  private say = (context: MessengerContext, message: Message | Message[]) => {
    const {
      _session: {
        user: { id: recipientId },
      },
    } = context;
    if (typeof message === 'string') {
      return context.client.sendText(recipientId, message);
    } else if (isQuickReplyTemplate(message)) {
      return context.client.sendText(recipientId, message.text, {
        quickReplies: message.quickReplies,
      });
    } else if (isButtonTemplate(message)) {
      return context.client.sendTemplate(recipientId, {
        templateType: 'button',
        ...message,
      });
    } else if (isGenericTemplate(message)) {
      return context.client.sendGenericTemplate(recipientId, message.cards);
    } else if (Array.isArray(message)) {
      return message.reduce((promise, msg) => {
        return promise.then(() => this.say(context, msg));
      }, Promise.resolve(undefined));
    }
    this.logger.error('Invalid format for .say() message.');
  };
}
