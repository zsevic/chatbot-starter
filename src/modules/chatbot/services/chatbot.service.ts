import { Inject, Injectable } from '@nestjs/common';
import {
  GET_STARTED_PAYLOAD,
  GREETING_TEXT,
  PERSISTENT_MENU,
} from 'modules/chatbot/chatbot.constants';
import { ChatbotController } from 'modules/chatbot/chatbot.controller';
import { BOOTBOT_OPTIONS_FACTORY } from 'modules/external/bootbot';
import { UserService } from 'modules/user/user.service';
import { ResponseService } from './response.service';

@Injectable()
export class ChatbotService {
  constructor(
    @Inject(BOOTBOT_OPTIONS_FACTORY) private readonly chatbotService,
    private readonly controller: ChatbotController,
    private readonly responseService: ResponseService,
    private readonly userService: UserService,
  ) {}

  private asyncWrap = (fn) => async (payload, chat) => {
    const user = await this.userService.validateUser(payload.sender.id);

    if (!user && payload?.postback?.payload !== GET_STARTED_PAYLOAD) {
      const { locale } = await chat.getUserProfile();
      if (!locale) return;

      const response = await this.responseService.getRegisterUserFailureResponse(
        locale,
      );
      return chat.say(response);
    }

    await fn(payload, chat);
  };

  init = (): void => {
    this.chatbotService.setGreetingText(GREETING_TEXT);
    this.chatbotService.setPersistentMenu(PERSISTENT_MENU);

    this.chatbotService.on(
      'attachment',
      this.asyncWrap(this.controller.attachmentHandler),
    );

    this.chatbotService.on(
      'message',
      this.asyncWrap(this.controller.messageHandler),
    );

    this.chatbotService.on(
      'postback',
      this.asyncWrap(this.controller.postbackHandler),
    );
  };
}
