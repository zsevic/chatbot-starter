import { Injectable } from '@nestjs/common';
import { MessengerTypes } from 'bottender';
import { State } from 'modules/state/state.dto';
import { ResponseService } from './response.service';

@Injectable()
export class ValidationService {
  constructor(private readonly responseService: ResponseService) {}

  validateMessage = (
    _: any,
    state: State,
    locale: string,
  ): MessengerTypes.TextMessage => {
    if (!state || !state.current_state) {
      return this.responseService.getDefaultResponse(locale);
    }
  };
}
