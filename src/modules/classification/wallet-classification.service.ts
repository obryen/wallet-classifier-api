import { Injectable, Logger } from "@nestjs/common";
import * as ethers from 'ethers'
import TokenConfigurationService from "../token-configuration/token-configuration.service";
import { GetClassificationDto } from "./dto/request";
import { ClassificationDTO } from "./dto/response";
import { WalletClassification } from "../token-configuration/token-configuration.entity";
import CONFIG from "../../config";
import * as util from 'util'
import { InternalServerErrorException } from "../../core/exceptions";
import { getWeb3Provider, validateAndRetriveABI } from "../../core/shared/utils";
@Injectable()
export default class WalletClassificationService {
    logger: any
    constructor(
        private _tokenConfigurationService: TokenConfigurationService
    ) {
        this.logger = new Logger('WalletClassificationService');
    }

    async classify(dto: GetClassificationDto) {
        try {

            const tokenConfigurations = await this._tokenConfigurationService.getAll();
            const classifications: ClassificationDTO[] = await Promise.all(
                tokenConfigurations.map(async (tokenConfiguration) => {
                    const tokenContract = new ethers.Contract(tokenConfiguration.tokenAddress, [validateAndRetriveABI(tokenConfiguration.abi)], getWeb3Provider(tokenConfiguration.networkType));
                    const balance = await tokenContract.balanceOf(dto.walletAddress);
                    const balanceNumber = parseFloat(ethers.formatUnits(balance, 0));

                    // Classify the wallet based on the threshold
                    const classification = balanceNumber >= tokenConfiguration.threshold ? tokenConfiguration.classification : WalletClassification.MORTAL;
                    return {
                        network: dto.network,
                        threshold: tokenConfiguration.threshold,
                        balance: balanceNumber,
                        status: classification,
                    };
                }),
            );

            return {
                wallet: dto.walletAddress,
                classifications,
            }
        } catch (e) {
            this.logger.error(`error running [classify]: `, util.inspect(e));
            throw new InternalServerErrorException('Something failed at [WalletClassificationService][classify]')
        }

    }

  isNetworkSupported(networkInput:string){

  }


}
