import { ArrayType, Entity, Enum, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

export interface Project {
  title: string;
  short_description: string;
  link: string;
}

enum Education {
  Diploma = "دیپلم",
  Bachelor = "کارشناسی",
  Master = "ارشد",
  Doctorate = "دکتری",
}

@Entity()
export class JobSeeker extends BaseEntity {
  @Property({ type: "string" })
  firstname!: string;

  @Property({ type: "string" })
  lastname!: string;

  @Property({ type: "int" })
  age!: number;

  @Enum({ items: () => Education, nullable: false })
  eduction!: string;

  @Property({ type: "string" })
  profile_image!: string;

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
