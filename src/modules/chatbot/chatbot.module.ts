import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'common/config';
import { StateModule } from 'modules/state/state.module';
import { UserModule } from 'modules/user/user.module';
import { ChatbotController } from './chatbot.controller';
import {
  AttachmentService,
  ChatbotService,
  MessageService,
  PostbackService,
  ResolverService,
  ResponseService,
  ValidationService,
} from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    StateModule,
    UserModule,
  ],
  controllers: [ChatbotController],
  providers: [
    AttachmentService,
    ChatbotController,
    ChatbotService,
    MessageService,
    PostbackService,
    ResolverService,
    ResponseService,
    ValidationService,
  ],
  exports: [ChatbotService],
})
export class ChatbotModule implements OnModuleInit {
  constructor(private readonly chatbotService: ChatbotService) {}

  onModuleInit = () => this.chatbotService.init();
}
