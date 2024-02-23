import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import ResponseHandler from "../helper/response";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

interface IRequest extends Request {
  [x: string]: any;
  req: {
    user: User;
  };
}

export const Authorization = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  const [bearer, token] = authorization?.split(" ") || [];
  try {
    if (token) {
      const { sub } = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      const user = prisma.user.findUnique({
        where: {
          id: Number(sub),
        },
      });
      if (!user)
        throw ResponseHandler(
          StatusCodes.UNAUTHORIZED,
          false,
          null,
          "login to your account"
        );
      req.user = user;
      next();
    }
    next();
  } catch (error) {
    next(error);
  }
};
