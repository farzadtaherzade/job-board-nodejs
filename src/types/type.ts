import { User } from "@prisma/client";
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

export interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}
