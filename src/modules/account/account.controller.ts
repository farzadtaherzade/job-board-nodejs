import { AccountService } from "./account.service";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import ResponseHandler from "../../helper/response";
import { StatusCodes } from "http-status-codes";
import { UpdateResumeDto } from "./dtos/updateResume.dto";

const accountService: AccountService = new AccountService();

export class AccountController {
  // get user info
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User | undefined = req?.user;
      const userService = await accountService.getMe(user!);
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, userService, null));
    } catch (error) {
      next(error);
    }
  }
  // update resume
  async updateResume(req: Request, res: Response, next: NextFunction) {
    try {
      const updateResumeDto: UpdateResumeDto = req.body;
      const user: User | undefined = req.user;
      const updatedUser = await accountService.updateResume(
        user!,
        updateResumeDto
      );
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, updatedUser, null));
    } catch (error) {
      next(error);
    }
  }
}
