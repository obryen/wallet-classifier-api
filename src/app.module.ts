import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "./core/database/config";
import HttpExceptionFilter from "./core/exceptions/filter";
import { ConfigModule } from "@nestjs/config";
import { configSchema } from "./config/enviroment-validation-schema";
import { RequestLoggerMiddleware } from "./core/middlewares/request-logger.middleware";
import TokenConfigurationModule from "./modules/token-configuration/token-configuration.module";
import { ClassificationModule } from "./modules/classification/wallet-classification.module";

const CUSTOM_MODULES = [TokenConfigurationModule, ClassificationModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      validationSchema: configSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: false
      }
    }),
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
    ...CUSTOM_MODULES,
  ],
  controllers: [],
  providers: [
    Logger,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
