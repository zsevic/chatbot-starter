import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'common/config';
import { ChatbotModule } from 'modules/chatbot/chatbot.module';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    ChatbotModule,
  ],
  controllers: [WebhookController],
})
export class WebhookModule {}
