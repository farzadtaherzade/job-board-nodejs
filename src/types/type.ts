import { Employer, User } from "@prisma/client";
declare global {
  namespace Express {
    export interface Request {
      user?: UserWithEmployer;
    }
  }
}

export interface UserWithEmployer extends User {
  employer: Employer | null;
}

export interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}
