import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { WalletClassification } from "../token-configuration.entity";
import { NetworkTypeEnum } from "../../../core/shared/utils";


export class CreateTokenConfigurationReqDTO {
  @ApiProperty()
  @IsString()
  network: string
  @ApiProperty()
  @IsString()
  tokenAddress: string
  @ApiProperty()
  @IsNumber()
  threshold: number
  @ApiProperty()
  @IsString()
  abi: string
  @ApiProperty()
  @IsEnum(WalletClassification)
  classification: WalletClassification
  networkType: NetworkTypeEnum
}

export class UpdateTokentConfigurationReqDTO {
  id;
  @ApiProperty()
  @IsString({ message: 'token address is string' })
  tokenAddress: string
  @ApiProperty()
  @IsNumber({}, { message: 'threshhold is a number' })
  @IsNotEmpty({ message: 'threshold is missing' })
  threshold: number
}
