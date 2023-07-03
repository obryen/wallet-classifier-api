import { Controller, Get } from "../../core/decorators";
import WalletClassificationService from "./wallet-classification.service";
import { BadRequestException, Param } from "@nestjs/common";
import { ClassificationResDTO } from "./dto/response";
import { NetworkTypeEnum, selectNetwork } from "../../core/shared/utils";


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
  getWalletClassification(@Param("address") address: string, @Param("network") network: string): Promise<any> {
    if (!address || !network) {
      throw new BadRequestException('You need to include both network and address in the params')
    }
    const networkType = this._walletClassificationService.validateBeforeClassification(network, address);
    return this._walletClassificationService.classify(networkType, address)
  }
}
