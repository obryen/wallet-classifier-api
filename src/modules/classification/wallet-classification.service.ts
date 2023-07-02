import { Injectable, Logger } from "@nestjs/common";
import * as ethers from 'ethers'
import TokenConfigurationService from "../token-configuration/token-configuration.service";
import { GetClassificationDto } from "./dto/request";
import { ClassificationDTO, ClassificationResDTO } from "./dto/response";
import { WalletClassification } from "../token-configuration/token-configuration.entity";
import CONFIG from "../../config";
import * as util from 'util'
import { BadRequestErrorResponseDTO } from "src/core/exceptions/response";
import { BadRequestException, InternalServerErrorException } from "src/core/exceptions";

const GET_BALANCE_ABI = 'function balanceOf(address) view returns (uint256)';
@Injectable()
export default class WalletClassificationService {
    logger: any
    constructor(
        private _tokenConfigurationService: TokenConfigurationService
    ) {
        this.logger = new Logger('WalletClassificationService');
    }

    async classify(dto: GetClassificationDto) {
        // get network type // mainnet or tesnet
        const networkType = null;
        const cryptoCurrency = 'ether'

        try {
            const provider = new ethers.AlchemyProvider(networkType, CONFIG.APP.ALCHEMY_API);
            const tokenConfigurations = await this._tokenConfigurationService.getAll();
            const classifications: ClassificationDTO[] = await Promise.all(
                tokenConfigurations.map(async (tokenConfiguration) => {
                    const tokenContract = new ethers.Contract(tokenConfiguration.tokenAddress, [this.getABI(tokenConfiguration.abi)], provider);
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
            this.logger.error(`error when using ${CONFIG.APP.ALCHEMY_API} provider: `, util.inspect(e));
            throw new InternalServerErrorException('Something failed at [WalletClassificationService][classify]')
        }

    }

    getABI(abi: string) {
        if (abi === 'ERC-20') {
            return 'function balanceOf(address) view returns (uint256)'
        } else {
            throw new BadRequestException('Unsuported protocal');
        }
    }
}
