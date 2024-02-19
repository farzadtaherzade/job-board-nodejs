import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Employer extends BaseEntity {
  @Property({ type: "string" })
  firstname!: string;

  @Property({ type: "string" })
  lastname!: string;

  @OneToOne({ entity: () => User, nullable: true })
  user!: User;
}
