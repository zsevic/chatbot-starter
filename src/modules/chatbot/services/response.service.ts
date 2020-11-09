import { Inject, Injectable } from '@nestjs/common';
import {
  ABOUT_ME_PAYLOAD,
  CHATBOT_ABOUT_ME_BUTTON,
  CHATBOT_ABOUT_ME_MESSAGE,
  CHATBOT_DEFAULT_MESSAGE,
  GET_STARTED_PAYLOAD,
  REGISTRATION_BUTTON,
  REGISTRATION_FAILURE,
  USER_REGISTRATION_SUCCESS,
} from 'modules/chatbot/chatbot.constants';
import { I18N_OPTIONS_FACTORY } from 'modules/external/i18n';
import { name as projectName } from 'root/package.json';

@Injectable()
export class ResponseService {
  constructor(@Inject(I18N_OPTIONS_FACTORY) private readonly i18nService) {}

  getAboutMeResponse = (locale: string): string =>
    this.i18nService.__(
      {
        phrase: CHATBOT_ABOUT_ME_MESSAGE,
        locale,
      },
      {
        projectName,
      },
    );

  getDefaultResponse = (locale: string) => {
    const text = this.i18nService.__({
      phrase: CHATBOT_DEFAULT_MESSAGE,
      locale,
    });
    const quickReplies = this.getDefaultResponseQuickReplies(locale);

    return {
      text,
      quickReplies,
    };
  };

  getDefaultResponseQuickReplies = (locale: string) => {
    const title = this.i18nService.__({
      phrase: CHATBOT_ABOUT_ME_BUTTON,
      locale,
    });

    return [
      {
        title,
        payload: ABOUT_ME_PAYLOAD,
        content_type: 'text',
      },
    ];
  };

  getRegisterUserSuccessResponse = (locale: string) => {
    const text = this.i18nService.__({
      phrase: USER_REGISTRATION_SUCCESS,
      locale,
    });
    const quickReplies = this.getDefaultResponseQuickReplies(locale);

    return {
      text,
      quickReplies,
    };
  };

  getRegisterUserFailureResponse = (locale: string) => {
    const { user: userI18n } = this.i18nService.getCatalog(locale);

    return {
      text: userI18n[REGISTRATION_FAILURE],
      buttons: [
        {
          type: 'postback',
          title: userI18n[REGISTRATION_BUTTON],
          payload: GET_STARTED_PAYLOAD,
        },
      ],
    };
  };
}
