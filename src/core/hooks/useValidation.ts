import { INestApplication, ValidationPipe } from '@nestjs/common';

export default function (app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, enableDebugMessages: true, disableErrorMessages: false }));
}
