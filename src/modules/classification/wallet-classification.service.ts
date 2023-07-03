import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import * as ethers from 'ethers'
import TokenConfigurationService from "../token-configuration/token-configuration.service";
import { GetClassificationDto } from "./dto/request";
import { ClassificationDTO, ClassificationResDTO } from "./dto/response";
import { WalletClassification } from "../token-configuration/token-configuration.entity";
import * as util from 'util'
import { InternalServerErrorException } from "../../core/exceptions";
import { NetworkTypeEnum, getWeb3Provider, isValidTokenAddress, selectNetwork, validateAndRetriveABI } from "../../core/shared/utils";
@Injectable()
export default class WalletClassificationService {
    logger: any
    constructor(
        private _tokenConfigurationService: TokenConfigurationService
    ) {
        this.logger = new Logger('WalletClassificationService');
    }

    async classify(networkType: NetworkTypeEnum, walletAddress: string) {
        try {
            const tokenConfigurations = await this._tokenConfigurationService.getAllByNetworkType(networkType);
            this.logger.log('tokenConfigurations size', tokenConfigurations.length);

            const classificationPromises = tokenConfigurations.map(async (tokenConfiguration) => {
                try {
                    const tokenContract = new ethers.Contract(
                        tokenConfiguration.tokenAddress,
                        [validateAndRetriveABI(tokenConfiguration.abi)],
                        getWeb3Provider(tokenConfiguration.networkType)
                    );
                    const balance = await tokenContract.balanceOf(walletAddress);
                    const balanceNumber = parseFloat(ethers.formatUnits(balance, 0));

                    // Classify the wallet based on the threshold
                    const classification = balanceNumber >= tokenConfiguration.threshold
                        ? tokenConfiguration.classification
                        : WalletClassification.MORTAL;

                    return {
                        network: networkType,
                        threshold: tokenConfiguration.threshold,
                        balance: balanceNumber,
                        status: classification,
                        tokenAddress: tokenConfiguration.tokenAddress
                    } as ClassificationDTO;
                } catch (error) {
                    // Handle individual errors and return a fallback classification
                    this.logger.error(`Error processing token configuration: ${tokenConfiguration.tokenAddress}`);
                    this.logger.error(util.inspect(error));

                    return {
                        network: networkType,
                        threshold: tokenConfiguration.threshold,
                        balance: 0,
                        status: WalletClassification.ERROR,
                        tokenAddress: tokenConfiguration.tokenAddress
                    };
                }
            });

            const classifications = await Promise.allSettled(classificationPromises);

            return {
                wallet: walletAddress,
                classifications: classifications,
            };
        } catch (error) {
            // Handle any errors within the classify function
            this.logger.error(`Error running [classify]: ${util.inspect(error)}`);
            throw new InternalServerErrorException('Something went wrong');
        }
    }


    validateBeforeClassification(network: string, address: string): NetworkTypeEnum {
        const selectedNetwork = selectNetwork(network);
        if (!selectedNetwork) {
            throw new BadRequestException(`${network} network type is not supported, it needs to be one of : ${Object.values(NetworkTypeEnum)}`);
        }
        if (!isValidTokenAddress(address)) {
            throw new BadRequestException('Invalid token address')
        }

        return selectedNetwork;
    }
}
