import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  getDefaultResponse = (): string => {
    return 'default message';
  };
}
