import { Job, Prisma, PrismaClient, User } from "@prisma/client";
import { CreateJobDto } from "./dtos/createJob.dto";
import { CompanyService, Sort } from "../company/company.service";
import { IUser } from "../../types/type";
import ResponseHandler from "../../helper/response";
import { StatusCodes } from "http-status-codes";
import { UpdateJobDto } from "./dtos/updateJob.dto";
import { ResponseJobRequestDto } from "./dtos/responseJob.dto";

const prisma: PrismaClient = new PrismaClient();

export class JobService {
  async create(createJobDto: CreateJobDto, user: IUser) {
    const company = await this.findCompanyByEmployerId(user?.employer?.id);
    if (!company.confirm)
      throw ResponseHandler(
        StatusCodes.NOT_FOUND,
        false,
        null,
        "your company not confirm by admin."
      );
    createJobDto.employerId = user?.employer?.id!;
    createJobDto.companyId = company.id;
    const job = await prisma.job
      .create({
        data: createJobDto,
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError)
          throw ResponseHandler(
            StatusCodes.BAD_REQUEST,
            false,
            null,
            "try again"
          );
      });
    console.log(job);
    return job;
  }

  async update(updateJobDto: UpdateJobDto, user: IUser, id: number) {
    const job = await this.find(id);
    if (job.employerId !== user.employer?.id)
      throw ResponseHandler(
        StatusCodes.BAD_REQUEST,
        false,
        null,
        `Your not allow to update this job.`
      );
    const update = await prisma.job.update({
      where: {
        id
      },
      data: updateJobDto
    }).catch(err => {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw ResponseHandler(
          StatusCodes.BAD_REQUEST,
          false,
          null,
          "try again"
        );
    })
    return update;
  }

  async remove(user: IUser, id: number) {
    const job = await this.find(id);
    if (job.employerId !== user.employer?.id)
      throw ResponseHandler(
        StatusCodes.BAD_REQUEST,
        false,
        null,
        `Your not allow to update this job.`
      );
    const remove = await prisma.job.delete({
      where: {
        id
      },
    }).catch(err => {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw ResponseHandler(
          StatusCodes.BAD_REQUEST,
          false,
          null,
          "the job not removed!"
        );
    })
    return "job remove successfully";
  }

  async findAll(sort: Sort = Sort.ASC, search?: string) {
    const where = search
      ? {
        title: {
          search,
        },
      }
      : {};
    const jobs = await prisma.job.findMany({
      where,
      orderBy: [
        {
          status: "desc",
        },
        {
          createdAt: sort,
        },
        // {
        //   _relevance: search
        //     ? {
        //         fields: [
        //           "title",
        //           // "short_desc",
        //           // "description",
        //           // "skill_required",
        //         ],
        //         search: search,
        //         sort: "desc",
        //       }
        //     : undefined,
        // },
      ],
      include: {
        employer: true,
        company: true,
        _count: true,
      },
    });
    return jobs;
  }

  async find(id: number) {
    const job = await prisma.job.findFirst({
      where: { id },
      include: {
        employer: true,
        company: true,
        _count: true,
      },
    });
    if (!job)
      throw ResponseHandler(
        StatusCodes.NOT_FOUND,
        false,
        null,
        `Job with ${id} not found`
      );
    return job;
  }

  async sendResume(user: IUser, id: number) {
    const job = await this.find(id)
    if (!user.resume) throw ResponseHandler(
      StatusCodes.BAD_REQUEST,
      false,
      null,
      `User must fill in the resume information.`
    );
    if (job.status === "CLOSED") throw ResponseHandler(
      StatusCodes.BAD_REQUEST,
      false,
      null,
      `This job is no longer accepting resumes.`
    );
    const request = await prisma.jobRequest.findFirst({
      where: {
        resumeId: user.resume.id,
        status: "PENDING",
      }
    })
    if (request) throw ResponseHandler(
      StatusCodes.BAD_REQUEST,
      false,
      null,
      `You Already send your resume to this job`
    );
    const jobRequest = await prisma.jobRequest.create({
      data: {
        companyId: job.companyId,
        employerId: job.employerId,
        resumeId: user.resume.id,
        jobId: job.id,
        status: "PENDING"
      }
    }).catch(err => {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) throw ResponseHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        false,
        null,
        `Failed to send resume.`
      );
    });
    return "your resume sending for employer successfully"
  }

  async receivedResume(user: IUser, id: number) {
    const job = this.find(id)
    const resumes = await prisma.jobRequest.findMany({
      where: {
        jobId: id
      },
      include: {
        company: true,
        employer: true,
        resume: true,
      }
    })
    return resumes
  }

  async sentHistory(user: IUser, id: number) {
    const job = this.find(id)
    const history = await prisma.jobRequest.findMany({
      where: {
        jobId: id,
        resumeId: user?.resume?.id,
        OR: [
          {
            status: "ACCEPTED"
          },
          {
            status: "REJECTED"
          }
        ]
      },
      include: {
        company: true,
        employer: true,
        resume: true,
      }
    })
    return history
  }

  async answerJobRequest(user: IUser, jobId: number, id: number, responseJobRequestDto: ResponseJobRequestDto) {
    const jobRequest = await prisma.jobRequest.update({
      where: {
        id,
        jobId
      },
      data: responseJobRequestDto
    }).catch(err => {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        throw ResponseHandler(
          StatusCodes.BAD_GATEWAY,
          false,
          null,
          `the JobRequest not found make sure of your jobId`
        );
    })
    return jobRequest
  }

  async findCompanyByEmployerId(employerId: number | undefined) {
    const company = await prisma.company.findUnique({
      where: {
        employerId,
      },
    });
    if (!company)
      throw ResponseHandler(
        StatusCodes.NOT_FOUND,
        false,
        null,
        "You have not copany to create job."
      );
    return company;
  }

}
