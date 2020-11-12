import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';
import { ChatbotController } from './chatbot.controller';
import {
  ChatbotService,
  LocationService,
  MessageService,
  PostbackService,
  ResolverService,
  ResponseService,
  ValidationService,
} from './services';

@Module({
  imports: [UserModule],
  controllers: [ChatbotController],
  providers: [
    ChatbotController,
    ChatbotService,
    LocationService,
    MessageService,
    PostbackService,
    ResolverService,
    ResponseService,
    ValidationService,
  ],
})
export class ChatbotModule {}
