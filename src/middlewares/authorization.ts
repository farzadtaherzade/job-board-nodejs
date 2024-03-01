import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import ResponseHandler from "../helper/response";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

export const Authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    const [bearer, token] = authorization?.split(" ") || [];
    if (token) {
      const { sub } = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      const user = await prisma.user.findUnique({
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
      return next();
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
