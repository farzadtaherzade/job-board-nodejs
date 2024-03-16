import { UpdateJobDto } from "./dtos/updateJob.dto";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { JobService } from "./jobs.service";
import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../../helper/response";
import { CreateJobDto } from "./dtos/createJob.dto";
import { IUser } from "../../types/type";
import { Sort } from "../company/company.service";
import { ResponseJobRequestDto } from "./dtos/responseJob.dto";

const jobService: JobService = new JobService();

export class JobController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser | undefined = req.user;
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
      const user: IUser | undefined = req.user;
      const id: number = +req.params.id;
      const updateJobDto: UpdateJobDto = req.body;
      const update = await jobService.update(updateJobDto, user!, id);

      return res
        .status(StatusCodes.CREATED)
        .json(ResponseHandler(StatusCodes.CREATED, true, update, null));
    } catch (error) {
      next(error);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser | undefined = req.user;
      const id: number = +req.params.id;
      const remove = await jobService.remove(user!, id)
      return res
        .status(StatusCodes.CREATED)
        .json(ResponseHandler(StatusCodes.CREATED, true, remove, null));
    } catch (error) {
      next(error);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      let sort: Sort = (req.query?.sort as Sort) || Sort.ASC;
      const search: string = (req.query?.search as string) || "";
      if (!Object.values(Sort).includes(sort)) {
        sort = Sort.ASC;
      }
      console.log(search);
      const findAll = await jobService.findAll(sort, search);
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
      const user: IUser | undefined = req.user;
      const id: number = +req.params.id;

      const send = await jobService.sendResume(user!, id)
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, send, null));
    } catch (error) {
      next(error);
    }
  }

  async receivedResume(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser | undefined = req.user;
      const id: number = +req.params.id;

      const receiveds = await jobService.receivedResume(user!, id)
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, receiveds, null));
    } catch (error) {
      next(error);
    }
  }

  async sentHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser | undefined = req.user;
      const id: number = +req.params.id;

      const history = await jobService.sentHistory(user!, id)
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, history, null));
    } catch (error) {
      next(error);
    }
  }

  async answerJobRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser | undefined = req.user;
      const jobId: number = +req.params.jobId;
      const id: number = +req.params.id;
      const responseJobRequestDto: ResponseJobRequestDto = req.body

      const answer = await jobService.answerJobRequest(user!, jobId, id, responseJobRequestDto)
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, answer, null));
    } catch (error) {
      next(error);
    }
  }
}
