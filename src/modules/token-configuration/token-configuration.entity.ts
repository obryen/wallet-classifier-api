import BaseEntity from "../../core/entity/base.entity";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

export enum WalletClassification {
  GOD_MODE = "GodMode",
  MORTAL = "Mortal"

}
@Entity("token_configuration")
export default class TokenConfigurationEntity extends BaseEntity {
  constructor(obj: Partial<TokenConfigurationEntity> = null) {
    super();
    if (obj != null) {
      Object.assign(this, obj)
    }
  }
  @Column({ nullable: false })
  network: string;

  @Column({ nullable: false })
  tokenAddress: string;

  @Column({ nullable: false })
  threshold: number;

  @Column({ nullable: false })
  abi: string;

  @Column({ nullable: false, enum: Object.values(WalletClassification) })
  classification: WalletClassification;
}
