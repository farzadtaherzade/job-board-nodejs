import { Prisma, PrismaClient, User } from "@prisma/client";
import { CreateJobDto } from "./dtos/createJob.dto";
import { CompanyService } from "../company/company.service";
import { UserWithEmployer } from "../../types/type";
import ResponseHandler from "../../helper/response";
import { StatusCodes } from "http-status-codes";

const prisma: PrismaClient = new PrismaClient();

export class JobService {
  async create(createJobDto: CreateJobDto, user: UserWithEmployer) {
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
  async findAll() {
    const jobs = await prisma.job.findMany({
      orderBy: [
        {
          open: "desc",
        },
        {
          createdAt: "desc",
        },
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
    const jobs = await prisma.job.findFirst({
      where: { id },
      include: {
        employer: true,
        company: true,
        jobRequest: true,
        _count: true,
      },
    });
    return jobs;
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
