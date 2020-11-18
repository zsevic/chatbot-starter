import { Controller } from '@nestjs/common';
import { MessengerContext, MessengerTypes } from 'bottender';
import {
  DEFAULT_MESSENGER_GENDER,
  DEFAULT_MESSENGER_LOCALE,
} from 'common/config/constants';
import { ABOUT_ME_PAYLOAD, GET_STARTED_PAYLOAD } from './chatbot.constants';
import { PayloadHandlers } from './chatbot.types';
import { getUserOptions } from './chatbot.utils';
import { LocationService } from './services/location.service';
import { MessageService } from './services/message.service';
import { PostbackService } from './services/postback.service';
import { ResolverService } from './services/resolver.service';

@Controller()
export class ChatbotController {
  constructor(
    private readonly locationService: LocationService,
    private readonly messageService: MessageService,
    private readonly postbackService: PostbackService,
    private readonly resolverService: ResolverService,
  ) {}

  private aboutMeHandler = async (context: MessengerContext) =>
    this.resolverService.getAboutMeResponse(context);

  private getStartedButtonHandler = async (context: MessengerContext) => {
    const {
      firstName,
      gender = DEFAULT_MESSENGER_GENDER,
      lastName,
      locale = DEFAULT_MESSENGER_LOCALE,
      profilePic: image_url,
    } = await context.getUserProfile({
      fields: [
        'id',
        'first_name',
        'gender',
        'last_name',
        'locale',
        'profile_pic',
      ],
    });
    const userOptions = getUserOptions(context);
    return this.resolverService.registerUser(
      {
        ...userOptions,
        first_name: firstName,
        gender,
        image_url,
        last_name: lastName,
        locale,
      },
      userOptions,
    );
  };

  locationHandler = async (
    context: MessengerContext,
  ): Promise<MessengerTypes.TextMessage> =>
    this.locationService.handleLocation(context);

  messageHandler = async (context: MessengerContext) => {
    const { event } = context;
    if (event.isLocation) {
      return this.locationHandler(context);
    }

    if (this.quickReplyHandlers[event.quickReply?.payload])
      return this.quickReplyHandlers[event.quickReply?.payload](context);

    return this.messageService.handleMessage(context);
  };

  postbackHandler = async (context: MessengerContext) => {
    const {
      event: {
        postback: { payload: buttonPayload },
      },
    } = context;

    if (this.postbackHandlers[buttonPayload])
      return this.postbackHandlers[buttonPayload](context);

    return this.postbackService.handlePostback(context);
  };

  postbackHandlers: PayloadHandlers = {
    [ABOUT_ME_PAYLOAD]: this.aboutMeHandler,
    [GET_STARTED_PAYLOAD]: this.getStartedButtonHandler,
  };

  quickReplyHandlers: PayloadHandlers = {
    [ABOUT_ME_PAYLOAD]: this.aboutMeHandler,
  };
}
