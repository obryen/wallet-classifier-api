import { ApiProperty } from "@nestjs/swagger";
import { WalletClassification } from "../../../modules/token-configuration/token-configuration.entity";

export class ClassificationDTO {
  @ApiProperty()
  network: string;
  @ApiProperty()
  threshold: number;
  @ApiProperty()
  balance: any;
  @ApiProperty({ enum: Object.values(WalletClassification) })
  status: WalletClassification;
  @ApiProperty()
  tokenAddress: string
}

export class ClassificationResDTO {
  @ApiProperty()
  wallet: string;
  @ApiProperty()
  network: string;
  @ApiProperty()
  classifications: ClassificationDTO[]
}
