import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import bodyParser from 'body-parser';
import express from 'express';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { AppModule } from 'modules/app/app.module';
import { ChatbotModule } from 'modules/chatbot/chatbot.module';
import { ChatbotService } from 'modules/chatbot/services';

export const application = (function () {
  let _instance;
  return {
    get: async (): Promise<NestExpressApplication> => {
      if (!_instance) {
        const server = express();

        const verify = (req, _, buf): void => {
          req.rawBody = buf.toString();
        };
        server.use(bodyParser.json({ verify }));
        server.use(bodyParser.urlencoded({ extended: false, verify }));

        _instance = await NestFactory.create<NestExpressApplication>(
          AppModule,
          new ExpressAdapter(server),
          {
            logger: WinstonModule.createLogger({
              format: format.combine(format.timestamp(), format.json()),
              transports: [
                new transports.Console({
                  level: process.env.LOG_LEVEL || 'info',
                }),
              ],
            }),
          },
        );
      }
      return _instance;
    },
  };
})();

export default async function App() {
  const app = await application.get();
  const chatbotService = app
    .select(ChatbotModule)
    .get(ChatbotService, { strict: true });

  return chatbotService.getRouter();
}
