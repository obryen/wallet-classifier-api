import { Body, Param, UseGuards } from "@nestjs/common";
import { Controller, Get, Post, Put } from "../../core/decorators";
import {
  GetTokenConfigurationResponseDTO,
  TokenConfigurationDTO,
} from "./dto/response";
import TokenConfigurationService from "./token-configuration.service";
import { CreateTokenConfigurationReqDTO, UpdateTokentConfigurationReqDTO } from "./dto/request";
import { APIKeyGuard } from "src/core/guards/api-key.guard";


@Controller({
  group: "Token Configuration",
  path: "/token_configuration",
  version: "1",
})
export default class TokenConfigurationController {
  constructor(private _tokenConfigService: TokenConfigurationService) { }

  @Get({
    path: "/",
    description: "Get all token configurations",
    model: GetTokenConfigurationResponseDTO,
  })
  getTokenConfigurations() {
    return this._tokenConfigService.getAll();
  }

  @Post({
    path: "/",
    description: "Create a new token configuration",
    model: CreateTokenConfigurationReqDTO,
  })
  // @UseGuards(APIKeyGuard)
  createTokenConfig(@Body() data: CreateTokenConfigurationReqDTO) {
    return this._tokenConfigService.create(data);
  }

  @Put({
    path: "/:id",
    description: "Update a token configuration",
    model: TokenConfigurationDTO,
  })
  // @UseGuards(APIKeyGuard)
  updateTokenConfig(@Body() data: UpdateTokentConfigurationReqDTO, @Param("id") id: number) {
    data.id = id;
    return this._tokenConfigService.update(data);
  }
}
