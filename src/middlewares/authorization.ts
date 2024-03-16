import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { PrismaClient, Role, User } from "@prisma/client";
import ResponseHandler from "../helper/response";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

export const Authorization = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization?.split(" ") || [];
      if (token) {
        const { sub } = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        const user = await prisma.user.findUnique({
          where: {
            id: Number(sub),
          },
          include: {
            employer: true,
            resume: true
          },
        });
        if (!user)
          throw ResponseHandler(
            StatusCodes.UNAUTHORIZED,
            false,
            null,
            "login to your account"
          );
        if (user.role && roles.includes(user.role)) {
          req.user = user;
          return next();
        }
        throw ResponseHandler(
          StatusCodes.UNAUTHORIZED,
          false,
          null,
          "you dont have permission to this page"
        );
      }
      throw ResponseHandler(
        StatusCodes.UNAUTHORIZED,
        false,
        null,
        "login to your account"
      );
    } catch (error) {
      next(error);
    }
  };
};
