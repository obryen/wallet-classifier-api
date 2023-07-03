import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import TokenConfigurationEntity from "./token-configuration.entity";
import { Repository } from "typeorm";
import { CreateTokenConfigurationReqDTO, UpdateTokentConfigurationReqDTO } from "./dto/request";
import { Network, isValidTokenAddress, selectNetwork, validateAndRetriveABI } from "../../core/shared/utils";

@Injectable()
export default class TokenConfigurationService {
  constructor(
    @InjectRepository(TokenConfigurationEntity)
    private _tokenConfigRepo: Repository<TokenConfigurationEntity>
  ) { }

  async getAll(): Promise<TokenConfigurationEntity[]> {
    return await this._tokenConfigRepo.find({ where: { deleted: false } });
  }
  async getById(id: number): Promise<TokenConfigurationEntity> {
    return this._tokenConfigRepo.findOne({ where: { id } });
  }

  async create(
    tokenConfiguration: CreateTokenConfigurationReqDTO,
  ): Promise<TokenConfigurationEntity> {
    const { network, tokenAddress, abi } = tokenConfiguration;
    const existingToken = await this._tokenConfigRepo.findOne({
      where: { network, tokenAddress, abi },
    });

    if (existingToken) {
      throw new Error('Token configuration already exists');
    }

    return this._tokenConfigRepo.save(tokenConfiguration);
  }

  async update(
    updateConfigPayload: UpdateTokentConfigurationReqDTO,
  ): Promise<TokenConfigurationEntity> {
    const existinConfiguration = await this.getById(updateConfigPayload.id);
    if (!existinConfiguration) {
      throw new NotFoundException('This token configuration does not exist');
    }
    if (!isValidTokenAddress(updateConfigPayload.tokenAddress, existinConfiguration.network)) {
      throw new BadRequestException('Invalid token address')
    }
    const toUpdate = { ...existinConfiguration, ...new TokenConfigurationEntity({ ...updateConfigPayload }) };
    return this._tokenConfigRepo.save(toUpdate);
  }


  validateConfiguration(abi: string, network: string, tokenAddress: string) {
    validateAndRetriveABI(abi);
    const selectedNetwork = selectNetwork(network);
    if (!selectedNetwork) {
      throw new BadRequestException(`Network string must include one of ${Object.values(Network)}`)
    }
    if (!isValidTokenAddress(tokenAddress, selectedNetwork)) {
      throw new BadRequestException('Invalid token address')
    }
  }
}
