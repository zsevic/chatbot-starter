import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app/app.module';
import { ChatbotModule } from 'modules/chatbot/chatbot.module';
import { ChatbotService } from 'modules/chatbot/services';

const appContext = (function () {
  let _instance;
  return {
    get: async () => {
      if (!_instance) {
        _instance = await NestFactory.createApplicationContext(AppModule);
      }
      return _instance;
    },
  };
})();

export default async function App() {
  const app = await appContext.get();
  const chatbotService = app
    .select(ChatbotModule)
    .get(ChatbotService, { strict: true });

  return chatbotService.getRouter();
}
