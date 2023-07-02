import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import TokenConfigurationController from "./token-configruation.controller";
import TokenConfigurationEntity from "./token-configuration.entity";
import TokenConfigurationService from "./token-configuration.service";

@Module({
  imports: [TypeOrmModule.forFeature([TokenConfigurationEntity])],
  exports: [TokenConfigurationService],
  providers: [TokenConfigurationService],
  controllers: [TokenConfigurationController],
})
export default class TokenConfigurationModule {}
