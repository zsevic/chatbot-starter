import { name as projectName } from 'root/package.json';
import { chatbot as chatbotI18nEn } from 'locales/en.json';
import { chatbot as chatbotI18nSr } from 'locales/sr.json';

export const ABOUT_ME_PAYLOAD = 'ABOUT_ME_PAYLOAD';
export const GET_STARTED_PAYLOAD = 'GET_STARTED_PAYLOAD';

export const POSTBACK_TYPE = 'POSTBACK_TYPE';

const ABOUT_ME_BUTTON = 'ABOUT_ME_BUTTON';
const ABOUT_ME_MESSAGE = 'ABOUT_ME_MESSAGE';
const DEFAULT_MESSAGE = 'DEFAULT_MESSAGE';
export const CHATBOT_ABOUT_ME_BUTTON = `chatbot.${ABOUT_ME_BUTTON}`;
export const CHATBOT_ABOUT_ME_MESSAGE = `chatbot.${ABOUT_ME_MESSAGE}`;
export const CHATBOT_DEFAULT_MESSAGE = `chatbot.${DEFAULT_MESSAGE}`;

export const REGISTRATION_BUTTON = 'REGISTRATION_BUTTON';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';

export const USER_REGISTRATION_SUCCESS = `user.${REGISTRATION_SUCCESS}`;

export const DEFAULT = 'default';
export const EN_GB_LOCALE = 'en_GB';
export const EN_US_LOCALE = 'en_US';
export const SR_RS_LOCALE = 'sr_RS';
const EN_GREETING_TEXT = `Hi! This is ${projectName}`;
const SR_GREETING_TEXT = `Zdravo! Ovo je ${projectName}`;
export const GREETING_TEXT = [
  {
    locale: EN_GB_LOCALE,
    text: EN_GREETING_TEXT,
  },
  {
    locale: EN_US_LOCALE,
    text: SR_GREETING_TEXT,
  },
  {
    locale: SR_RS_LOCALE,
    text: SR_GREETING_TEXT,
  },
  {
    locale: DEFAULT,
    text: EN_GREETING_TEXT,
  },
];

const EN_PERSISTENT_MENU = [
  {
    type: 'postback',
    title: chatbotI18nEn[ABOUT_ME_BUTTON],
    payload: ABOUT_ME_PAYLOAD,
  },
];

const SR_PERSISTENT_MENU = [
  {
    type: 'postback',
    title: chatbotI18nSr[ABOUT_ME_BUTTON],
    payload: ABOUT_ME_PAYLOAD,
  },
];

export const PERSISTENT_MENU = [
  {
    locale: EN_GB_LOCALE,
    callToActions: EN_PERSISTENT_MENU,
    composerInputDisabled: false,
  },
  {
    locale: EN_US_LOCALE,
    callToActions: SR_PERSISTENT_MENU,
    composerInputDisabled: false,
  },
  {
    locale: SR_RS_LOCALE,
    callToActions: SR_PERSISTENT_MENU,
    composerInputDisabled: false,
  },
  {
    locale: DEFAULT,
    callToActions: EN_PERSISTENT_MENU,
    composerInputDisabled: false,
  },
];
