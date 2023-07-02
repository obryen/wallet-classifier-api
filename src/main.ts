import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CONFIG from './config';
import { useCors, useValidation, useSwagger, useApiVersioning } from './core/hooks';
import useLogger from './core/hooks/useLogger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  /** Inject any application level custom hook here */
  useLogger(app);
  useCors(app);
  useValidation(app);
  useApiVersioning(app);
  await useSwagger(app);

  await app.listen(CONFIG.APP.PORT, () => {
    Logger.log(`Application has started on port: ${CONFIG.APP.PORT}`, 'NestApplication');
  });
}

bootstrap();
