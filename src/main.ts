import path from 'path';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { bottender } from 'bottender';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { setupApiDocs } from 'common/config/api-docs';
import { HttpExceptionFilter } from 'common/filters';
import { loggerMiddleware } from 'common/middlewares';
import { CustomValidationPipe } from 'common/pipes';
import { connectToTunnelAndSetWebhookUrl, isEnv } from 'common/utils';
import { AppModule } from 'modules/app/app.module';
import { application } from './index';

const bottenderApp = bottender({ dev: !isEnv('production') });
export const handle = bottenderApp.getRequestHandler();

async function bootstrap(): Promise<void> {
  const app = await application.get();
  const logger = new Logger(bootstrap.name);
  const configService = app.get(ConfigService);

  app.enable('trust proxy');
  app.enableShutdownHooks();
  app.get(AppModule).subscribeToShutdown(() => app.close());

  app.use(compression());
  app.use(cookieParser(configService.get('COOKIE_SECRET')));
  app.use(helmet());
  app.use(loggerMiddleware);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new CustomValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );

  app.useStaticAssets(path.join(process.cwd(), 'public'));
  app.setViewEngine('ejs');

  setupApiDocs(app);
  const port = configService.get('PORT');

  await app.listen(port).then((): void => {
    logger.log(`Server is running on port ${port}`);
    if (!isEnv('production') && !isEnv('test')) {
      connectToTunnelAndSetWebhookUrl(port);
    }
  });
}

async function worker(): Promise<void> {
  await bottenderApp.prepare();
  await bootstrap();
}

process.on(
  'unhandledRejection',
  function handleUnhandledRejection(err: Error): void {
    const logger = new Logger(handleUnhandledRejection.name);
    logger.error(err.stack);
  },
);
