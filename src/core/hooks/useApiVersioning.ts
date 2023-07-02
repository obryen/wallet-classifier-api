import { INestApplication, VersioningType } from '@nestjs/common';

export default function (app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });
}
