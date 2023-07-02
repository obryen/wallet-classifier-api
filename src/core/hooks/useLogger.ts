import { LoggerOptions, format, transports, createLogger } from 'winston';
import CONFIG from 'src/config';
import { INestApplication } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

const loggerConfig: LoggerOptions = {
  // level: 'info',
  // format: format.json({ space: 2 }),
  defaultMeta: { service: { name: CONFIG.APP.NAME, version: CONFIG.APP.VERSION } },
  transports: [
    new transports.Console({
      format: CONFIG.ENV.IS_PRODUCTION
        ? format.combine(format.timestamp(), format.json({ space: 2 }))
        : format.combine(
            format.colorize({ all: true }),
            format.simple(),
            format.timestamp(),
            format.printf((info) => {
              return `[${info.timestamp}] [${info.level}]: ${info.message} - ${
                typeof info.context === 'object' ? JSON.stringify(info.context) : info.context
              }`;
            }),
          ),
    }),
  ],
};

export default function (app: INestApplication) {
  app.useLogger(WinstonModule.createLogger(loggerConfig));
}
