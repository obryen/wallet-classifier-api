import { BadRequestException } from "@nestjs/common";
import * as ethers from "ethers";
import CONFIG from "../../config";

export enum Network {
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

export function selectNetwork(networkString: string): Network | undefined {
    const networkKeys = Object.keys(Network);

    for (const key of networkKeys) {
        const network = Network[key as keyof typeof Network];

        if (networkString.includes(network)) {
            return network;
        }
    }

    return undefined;
}

export function validateAndRetriveABI(abi: string) {
    if (abi === 'ERC-20') {
        return 'function balanceOf(address) view returns (uint256)'
    } else {
        throw new BadRequestException('Unsuported protocal');
    }
}

export function isValidTokenAddress(tokenAddress: string, provider): boolean {
    try {
        // Attempt to create a contract instance with the token address
        const contract = new ethers.Contract(tokenAddress, [], provider);

        // Check if the contract address is a valid Ethereum address
        const isValidAddress = ethers.isAddress(contract.address);

        return isValidAddress;
    } catch (error) {
        return false;
    }
}

export function getWeb3Provider(networkType: string) {
    return new ethers.AlchemyProvider(networkType, CONFIG.APP.ALCHEMY_API_KEY);
}
