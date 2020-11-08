import { Injectable } from '@nestjs/common';
import { State } from 'modules/state/state.dto';
import { ResponseService } from './response.service';

@Injectable()
export class ValidationService {
  constructor(private readonly responseService: ResponseService) {}

  validateMessage = async (_: any, state: State, locale: string) => {
    if (!state || !state.current_state) {
      return this.responseService.getDefaultResponse(locale);
    }
  };
}
