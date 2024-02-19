import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Employer } from "./employer.entity";

@Entity()
export class Company extends BaseEntity {
  @Property({ type: "string", unique: true })
  name!: string;

  @Property({ type: "string" })
  companyImage!: string;

  @Property({ type: "string" })
  shortDescription!: string;

  @Property({ type: "string" })
  website!: string;

  @Property({ type: "string" })
  industry!: string;

  @Property({ type: "text" })
  about!: string;

  @Property({ type: "integer", })
  companySize!: number;

  @Property({ type: "string" })
  location!: string;

  @OneToOne({ entity: () => Employer, nullable: false })
  employer!: Employer;
}
