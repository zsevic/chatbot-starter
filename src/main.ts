import path from 'path';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import bodyParser from 'body-parser';
import { bottender } from 'bottender';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import throng from 'throng';
import { format, transports } from 'winston';
import { setupApiDocs } from 'common/config/api-docs';
import { AllExceptionsFilter } from 'common/filters';
import { loggerMiddleware } from 'common/middlewares';
import { CustomValidationPipe } from 'common/pipes';
import { isEnv } from 'common/utils';
import { AppModule } from 'modules/app/app.module';

const bottenderApp = bottender({ dev: !isEnv('production') });

async function bootstrap(): Promise<void> {
  const server = express();
  const handle = bottenderApp.getRequestHandler();

  const verify = (req, _, buf) => {
    req.rawBody = buf.toString();
  };
  server.use(bodyParser.json({ verify }));
  server.use(bodyParser.urlencoded({ extended: false, verify }));
  server.all('/webhooks/*', (req, res) => handle(req, res));

  const app = await NestFactory.create<NestExpressApplication>(
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
  const logger = new Logger(bootstrap.name);
  const configService = app.get('configService');

  app.enable('trust proxy'); // used for rate limiter
  app.enableShutdownHooks();
  app.get(AppModule).subscribeToShutdown(() => app.close());

  app.use(compression());
  app.use(cookieParser(configService.get('COOKIE_SECRET')));
  app.use(helmet());
  app.use(loggerMiddleware);
  app.useGlobalFilters(new AllExceptionsFilter());
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

  await app.listen(configService.get('PORT')).then(() => {
    logger.log(`Server is running on port ${configService.get('PORT')}`);
  });
}

async function worker() {
  await bottenderApp.prepare();
  await bootstrap();
}

throng({
  count: process.env.WEB_CONCURRENCY || 1,
  lifetime: Infinity,
  worker,
});

process.on('unhandledRejection', function handleUnhandledRejection(
  err: Error,
): void {
  const logger = new Logger(handleUnhandledRejection.name);
  logger.error(err.stack);
});
