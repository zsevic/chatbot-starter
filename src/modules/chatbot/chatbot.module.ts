import { Module } from '@nestjs/common';
import { ChatbotService, MessageService, ResponseService } from './services';

@Module({
  providers: [ChatbotService, MessageService, ResponseService],
})
export class ChatbotModule {}
