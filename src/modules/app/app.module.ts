import path from 'path';
import {
  Injectable,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationShutdown,
  RequestMethod,
} from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import rateLimit from 'express-rate-limit';
import { Connection } from 'mongoose';
import { Subject } from 'rxjs';
import config from 'common/config';
import { I18N_FALLBACKS } from 'common/config/constants';
import { RATE_LIMIT_REQUESTS, RATE_LIMIT_TIME } from 'common/config/rate-limit';
import { isEnv } from 'common/utils';
import { ChatbotModule } from 'modules/chatbot/chatbot.module';
import { I18nModule } from 'modules/external/i18n';
import { WebhooksModule } from 'modules/webhooks/webhooks.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
    }),
    I18nModule.registerAsync({
      useFactory: () => {
        const directory = isEnv('test') ? 'src/locales' : 'dist/locales';

        return {
          directory: path.join(process.cwd(), directory),
          fallbacks: I18N_FALLBACKS,
          objectNotation: true,
        };
      },
    }),
    ChatbotModule,
    WebhooksModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'configService',
      useFactory: () => new ConfigService(),
    },
  ],
})
@Injectable()
export class AppModule implements NestModule, OnApplicationShutdown {
  private readonly logger = new Logger(AppModule.name);
  private readonly shutdownListener$: Subject<void> = new Subject();

  constructor(@InjectConnection() private readonly connection: Connection) {}

  closeDatabaseConnection = async (): Promise<void> => {
    try {
      await this.connection.close();
      this.logger.log('Database connection is closed');
    } catch (error) {
      this.logger.error(error.message);
    }
  };

  configure = (consumer: MiddlewareConsumer): void => {
    const rateLimitMiddleware = rateLimit({
      windowMs: RATE_LIMIT_TIME,
      max: RATE_LIMIT_REQUESTS,
    });
    const routes: RouteInfo[] = [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ];
    consumer.apply(rateLimitMiddleware).forRoutes(...routes);
  };

  onApplicationShutdown = async (signal: string): Promise<void> => {
    if (!signal) return;
    this.logger.log(`Detected signal: ${signal}`);

    this.shutdownListener$.next();
    return this.closeDatabaseConnection();
  };

  subscribeToShutdown = (shutdownFn: () => void): void => {
    this.shutdownListener$.subscribe(() => {
      this.logger.log('App is closed');
      shutdownFn();
    });
  };
}
