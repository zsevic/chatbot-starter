import { parse } from 'querystring';
import { Injectable } from '@nestjs/common';
import { POSTBACK_TYPE } from 'modules/chatbot/chatbot.constants';
import { UserService } from 'modules/user/user.service';
import { ResolverService } from './resolver.service';

@Injectable()
export class PostbackService {
  constructor(
    private readonly resolverService: ResolverService,
    private readonly userService: UserService,
  ) {}

  handlePostback = async (buttonPayload: string, userId: number) => {
    const { locale } = await this.userService.getUser(userId);

    const { type } = parse(buttonPayload);
    await this.resolverService.resetState(userId);

    switch (type) {
      case POSTBACK_TYPE:
        return this.resolverService.getDefaultResponse(locale);
      default:
        return;
    }
  };
}
