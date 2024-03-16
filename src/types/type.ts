import { Employer, Resume, User } from "@prisma/client";
declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

export interface IUser extends User {
  employer: Employer | null;
  resume: Resume | null
}

export interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}
