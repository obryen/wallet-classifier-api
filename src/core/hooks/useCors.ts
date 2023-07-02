import { INestApplication } from '@nestjs/common';

export default function (app: INestApplication) {
  app.enableCors();
}
