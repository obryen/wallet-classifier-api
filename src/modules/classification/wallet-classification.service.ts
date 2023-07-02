import { Injectable, Logger } from "@nestjs/common";
import * as ethers from 'ethers'
import TokenConfigurationService from "../token-configuration/token-configuration.service";
import { GetClassificationDto } from "./dto/request";
import { ClassificationDTO, ClassificationResDTO } from "./dto/response";
import { WalletClassification } from "../token-configuration/token-configuration.entity";
import CONFIG from "../../config";

const GET_BALANCE_ABI = 'function balanceOf(address) view returns (uint256)';
@Injectable()
export default class WalletClassificationService {
    constructor(
        private _tokenConfigurationService: TokenConfigurationService
    ) { }

    async classify(dto: GetClassificationDto) {
        // get network type // mainnet or tesnet
        const networkType = null;
        const cryptoCurrency = 'ether'

        try {
            const provider = new ethers.AlchemyProvider(networkType, CONFIG.APP.ALCHEMY_API);
            const tokenConfigurations = await this._tokenConfigurationService.getAll();
            const classifications: ClassificationDTO[] = await Promise.all(
                tokenConfigurations.map(async (tokenConfiguration) => {
                    const balanceWei = await provider.getBalance(dto.wallet);
                    const balanceEther = ethers.formatUnits(balanceWei, cryptoCurrency);
                    const status = Number(balanceEther) > tokenConfiguration.threshold ? WalletClassification.GOD_MODE : WalletClassification.MORTAL;
                    const returnData: ClassificationDTO = {
                        network: tokenConfiguration.network,
                        threshold: tokenConfiguration.threshold,
                        balance: balanceEther,
                        currency: cryptoCurrency,
                        status,
                    }
                    return returnData;
                }),
            );

            return {
                wallet: dto.wallet,
                classifications,
            }
        } catch (e) {
            Logger.log('error when using alchemy provider: ', e);
            return 'something went wrong'
        }

    }

    private validateInputs(walletAddress: string, network: string) {
        if (!walletAddress || !network) {
            return false;
        }

        const walletAddressRegex = /^0x[a-fA-F0-9]{40}$/;
        if (!walletAddressRegex.test(walletAddress)) {
            return false;
        }

        const supportedNetworks = ['ethereum', 'binance'];
        if (!supportedNetworks.includes(network.toLowerCase())) {
            return false;
        }

        return true;
    }

}
