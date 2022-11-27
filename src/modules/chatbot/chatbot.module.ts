import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';
import { ChatbotService, MessageService, ResponseService } from './services';

@Module({
  imports: [UserModule],
  providers: [
    ChatbotService,
    MessageService,
    ResponseService,
  ],
})
export class ChatbotModule {}
