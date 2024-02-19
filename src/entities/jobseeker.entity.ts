import { ArrayType, Entity, Enum, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class JobSeeker extends BaseEntity {
  @Property({ type: "string" })
  firstname!: string;

  @Property({ type: "string" })
  lastname!: string;

  @Property({ type: "integer" })
  age!: number;

  @Enum({ items: () => Education, type: "enum", nullable: true })
  eduction!: Education;

  @Property({ type: "string" })
  profileImage!: string;

  @Property({ type: "string" })
  resume!: string;

  @Property({ type: ArrayType, nullable: false })
  skills!: string[];

  @Property({ type: "text" })
  address!: string;

  @Property({ type: ArrayType, nullable: true })
  projects!: Project[];

  @Property({ type: "string" })
  desiredJobTitle!: string;

  @Property({ type: "string" })
  location!: string;

  @OneToOne({ entity: () => User })
  user!: User;
}

export interface Project {
  title: string;
  short_description: string;
  link: string;
}

export enum Education {
  DIPLOMA = "دیپلم",
  BACHELOR = "کارشناسی",
  MASTER = "ارشد",
  DOCTORATE = "دکتری",
}
