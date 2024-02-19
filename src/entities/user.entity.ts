import { Entity, Enum, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Employer } from "./employer.entity";
import { JobSeeker } from "./jobseeker.entity";

export enum Role {
  ADMIN = "admin",
  EMPLOYER = "employer",
  JOBSEEKER = "jobSeeker",
  WRITER = "writer",
}

@Entity()
export class User extends BaseEntity {
  @Property({ type: "string" })
  email!: string;

  @Property({ type: "string" })
  username!: string;

  @Property({ type: "integer" })
  phone!: number;

  @Property({ type: "string" })
  password!: string;

  @Enum({ items: () => Role, nullable: false })
  role!: Role;

  @OneToOne({ entity: () => Employer, nullable: true })
  employer?: Employer;

  @OneToOne({ entity: () => JobSeeker, nullable: true })
  jobSeeker?: JobSeeker;
}