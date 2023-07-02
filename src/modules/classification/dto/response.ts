import { WalletClassification } from "../../../modules/token-configuration/token-configuration.entity";

export class ClassificationDTO {
  network: string;
  threshold: number;
  balance: any;
  status: WalletClassification;
  currency: string;
}

export class ClassificationResDTO {
  wallet: string;
  network: string;
  classifications: ClassificationDTO[]
}