import { PrismaClient, User } from "@prisma/client";
import { CreateEmployerDto } from "./dtos/createEmployer.dto";
import ResponseHandler from "../../helper/response";
import { StatusCodes } from "http-status-codes";
import { UpdateEmployerDto } from "./dtos/updateEmployer.dto";

const prisma: PrismaClient = new PrismaClient();

export class EmployerService {
  async createEmployer(createEmployerDto: CreateEmployerDto, user: User) {
    createEmployerDto.userId = user.id;
    const employer = await prisma.employer
      .create({
        data: createEmployerDto,
      })
      .catch((err) => {
        if (err)
          throw ResponseHandler(
            StatusCodes.BAD_REQUEST,
            false,
            null,
            "Employer already exists for this user."
          );
      });
    return employer;
  }

  async updateEmployer(updateEmployerDto: UpdateEmployerDto, user: User) {
    const employer = await this.findEmployerByUserId(user.id);
    if (!employer)
      throw ResponseHandler(
        StatusCodes.NOT_FOUND,
        false,
        null,
        "First add update your info"
      );
    const result = await prisma.employer
      .update({
        data: updateEmployerDto,
        where: {
          id: employer.id,
        },
      })
      .catch((err) => {});
    return result;
  }

  async getDetail(user: User) {
    const employer = await this.findEmployerByUserId(user.id);
    if (!employer)
      throw ResponseHandler(
        StatusCodes.NOT_FOUND,
        false,
        null,
        "First add update your info"
      );
    return employer;
  }

  async findEmployerByUserId(userId: number) {
    const employer = await prisma.employer.findUnique({
      where: {
        userId,
      },
      include: {},
    });
    return employer;
  }
}
