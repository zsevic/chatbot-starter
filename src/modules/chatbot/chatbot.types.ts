import { MessengerTypes } from 'bottender';

type Coordinates = {
  lat: number;
  long: number;
};

export type Location = {
  coordinates: Coordinates;
};

export type ButtonTemplate = {
  text: string;
  buttons: MessengerTypes.TemplateButton[];
};
