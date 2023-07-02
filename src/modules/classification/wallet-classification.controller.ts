import { any } from "joi";
import { Controller, Get } from "../../core/decorators";
import WalletClassificationService from "./wallet-classification.service";
import { Param } from "@nestjs/common";
import { ClassificationResDTO } from "./dto/response";


@Controller({
  group: "Wallet-classification",
  path: "/wallet_classification",
  version: "1",
})
export default class WalletClassificationController {
  constructor(private _walletClassificationService: WalletClassificationService) { }

  @Get({
    path: "/:address/:network",
    description: "classify wallet",
    model: ClassificationResDTO,
  })
  getTokenConfigurations(@Param("address") address: string, @Param("network") network: string): Promise<any> {
    return this._walletClassificationService.classify({ network, wallet: address })
  }
}
