import { NextFunction, Request, Response } from "express";
import { EmployerService } from "./employer.service";
import { User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../../helper/response";
import { UpdateEmployerDto } from "./dtos/updateEmployer.dto";

const employerService: EmployerService = new EmployerService();

export class EmployerController {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User | undefined = req.user;
      res
        .status(StatusCodes.CREATED)
        .json(ResponseHandler(StatusCodes.CREATED, true, user, null));
    } catch (error) {
      next(error);
    }
  }
  async getDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User | undefined = req.user;
      const getDetail = await employerService.getDetail(user!);
      res
        .status(StatusCodes.CREATED)
        .json(ResponseHandler(StatusCodes.CREATED, true, getDetail, null));
    } catch (error) {
      next(error);
    }
  }

  async updateEmployer(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User | undefined = req.user;
      const updateEmployerDto: UpdateEmployerDto = req.body;
      const updateEmployer = await employerService.updateEmployer(
        updateEmployerDto,
        user!
      );
      res
        .status(StatusCodes.CREATED)
        .json(ResponseHandler(StatusCodes.CREATED, true, updateEmployer, null));
    } catch (error) {
      next(error);
    }
  }

  async createEmployer(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User | undefined = req.user;
      const createEmployerDto = req.body;
      const createEmployer = await employerService.createEmployer(
        createEmployerDto,
        user!
      );
      res
        .status(StatusCodes.CREATED)
        .json(ResponseHandler(StatusCodes.CREATED, true, createEmployer, null));
    } catch (error) {
      next(error);
    }
  }
}
