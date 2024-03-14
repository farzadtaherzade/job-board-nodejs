import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { JobService } from "./jobs.service";
import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../../helper/response";
import { CreateJobDto } from "./dtos/createJob.dto";
import { UserWithEmployer } from "../../types/type";

const jobService: JobService = new JobService();

export class JobController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserWithEmployer | undefined = req.user;
      const createJobDto: CreateJobDto = req.body;
      const createJob = await jobService.create(createJobDto, user!);

      return res
        .status(StatusCodes.CREATED)
        .json(ResponseHandler(StatusCodes.CREATED, true, createJob, null));
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User | undefined = req.user;
    } catch (error) {
      next(error);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User | undefined = req.user;
    } catch (error) {
      next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAll = await jobService.findAll();
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, findAll, null));
    } catch (error) {
      next(error);
    }
  }
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = +req.params.id;
      const find = await jobService.find(id);
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, find, null));
    } catch (error) {
      next(error);
    }
  }

  async sendResume(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User | undefined = req.user;
    } catch (error) {
      next(error);
    }
  }
}
