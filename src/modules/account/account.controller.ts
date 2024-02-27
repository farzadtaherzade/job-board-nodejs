import { AccountService } from "./account.service";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../../types/type";
import ResponseHandler from "../../helper/response";
import { StatusCodes } from "http-status-codes";

const accountService: AccountService = new AccountService();

export class AccountController {
  async getMe(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const user: User = req?.user;
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, user, null));
    } catch (error) {}
  }
}
