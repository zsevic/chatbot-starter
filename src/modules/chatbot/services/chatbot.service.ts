import { Injectable } from '@nestjs/common';
import { MessengerContext } from 'bottender';
import { messenger, platform, router } from 'bottender/router';
import { DEFAULT_MESSENGER_LOCALE } from 'common/config/constants';
import { getUserOptions } from 'common/utils';
import { GET_STARTED_PAYLOAD } from 'modules/chatbot/chatbot.constants';
import { ChatbotController } from 'modules/chatbot/chatbot.controller';
import { UserService } from 'modules/user/user.service';
import { ResponseService } from './response.service';

@Injectable()
export class ChatbotService {
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
      return this.controller.say(context, response);
    }

    await fn(context);
  };

  getRouter = () => router([platform('messenger', this.handleMessenger)]);

  private handleMessenger = () =>
    router([
      messenger.message(this.asyncWrap(this.controller.messageHandler)),
      messenger.postback(this.asyncWrap(this.controller.postbackHandler)),
    ]);
}
