import { User } from "@prisma/client";

export interface IGetUserAuthInfoRequest extends Request {
  user: User; // or any other type
}
