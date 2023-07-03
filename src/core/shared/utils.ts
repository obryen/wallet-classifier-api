import { BadRequestException, Logger } from "@nestjs/common";
import * as util from 'util'
import * as ethers from "ethers";
import CONFIG from "../../config";

const ERC20_BALANCE_ABI = 'function balanceOf(address) view returns (uint256)';

export enum NetworkTypeEnum {
    Mainnet = "mainnet",
    Goerli = "goerli",
    Sepolia = "sepolia",
    Arbitrum = "arbitrum",
    ArbitrumGoerli = "arbitrum-goerli",
    Matic = "matic",
    MaticMumbai = "matic-mumbai",
    Optimism = "optimism",
    OptimismGoerli = "optimism-goerli",
}

export function selectNetwork(networkString: string): NetworkTypeEnum | undefined {
    const networkKeys = Object.keys(NetworkTypeEnum);

    for (const key of networkKeys) {
        const network = NetworkTypeEnum[key as keyof typeof NetworkTypeEnum];

        if (networkString.toLocaleLowerCase().includes(network)) {
            return network;
        }
    }

    return undefined;
}

export function validateAndRetriveABI(abi: string) {
    if (abi === 'ERC-20') {
        return ERC20_BALANCE_ABI
    } else {
        throw new BadRequestException('Unsuported protocal');
    }
}

export function isValidTokenAddress(tokenAddress: string): boolean {
    try {
        const isValidAddress = ethers.isAddress(tokenAddress);
        return isValidAddress;
    } catch (error) {
        Logger.error('[isValidTokenAddress] failed:', util.inspect(error))
        return false;
    }
}

export function getWeb3Provider(networkType: string) {
    return new ethers.AlchemyProvider(networkType, CONFIG.APP.ALCHEMY_API_KEY);
}
