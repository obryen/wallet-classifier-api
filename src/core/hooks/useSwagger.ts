import { RedocModule } from '@juicyllama/nestjs-redoc';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import CONFIG from 'src/config';

export default async function (app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(CONFIG.APP.NAME)
    .setVersion(CONFIG.APP.VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/v1/docs', app, document);
  await RedocModule.setup('/v1/redocs', app, document, {});
}
