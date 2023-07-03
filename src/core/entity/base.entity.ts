import {
  Column,
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export default class BaseEntity {
  @PrimaryColumn({ type: 'int' })
  @Generated('increment')
  id: number;

  @Column({ name: 'deleted', type: 'boolean', default: false })
  deleted: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
  })
  updatedAt: Date;
}
