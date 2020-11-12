import { MessengerTypes } from 'bottender';

export type ButtonTemplate = {
  text: string;
  buttons: MessengerTypes.TemplateButton[];
};

export type GenericTemplate = {
  cards: MessengerTypes.TemplateElement[];
};

export type Message =
  | string
  | MessengerTypes.TextMessage
  | ButtonTemplate
  | GenericTemplate;
