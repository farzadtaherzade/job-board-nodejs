import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../../helper/response";
import { CreateCompanyDto } from "./dtos/createCompany.dto";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { UpdateCompanyDto } from "./dtos/updateCompany.dto";
import {
  deleteResourceToCloudinary,
  uploadToCloudinary,
} from "../../helper/uploadCloudinary";
import { IUser } from "../../types/type";

const prisma: PrismaClient = new PrismaClient();

export enum Sort {
  "ASC" = "asc",
  "DESC" = "desc",
}

export class CompanyService {
  async createCompany(
    createCompanyDto: CreateCompanyDto,
    user: IUser,
    file: Express.Multer.File
  ) {
    createCompanyDto.company_size = +createCompanyDto.company_size;
    if (!user.employer) {
      throw new Error("Employer information is missing");
    }
    createCompanyDto.employerId = user.employer.id;
    const upload = await uploadToCloudinary(file.path, "logo");
    createCompanyDto.logo = upload;
    const company = await prisma.company
      .create({
        data: createCompanyDto,
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError)
          throw ResponseHandler(
            StatusCodes.BAD_REQUEST,
            false,
            null,
            "Comapny Already Exist"
          );
      });
    return company;
  }

  async updateCompany(
    updateCompanyDto: UpdateCompanyDto,
    user: IUser
  ) {
    if (!user.employer) {
      throw new Error("Employer information is missing");
    }
    const company = await this.findCompanyById(user.employer.id, false, {
      confirm: true,
    });
    const update = await prisma.company.update({
      where: {
        id: company.id,
      },
      data: updateCompanyDto,
    });
    return update;
  }
  async changeLogo(user: IUser, file: Express.Multer.File) {
    if (!user.employer) {
      throw new Error("Employer information is missing");
    }
    const company = await this.findCompanyById(user.employer.id, false, {
      confirm: true,
    });

    const deleteResult = await deleteResourceToCloudinary(company.logo);
    const logo = await uploadToCloudinary(file.path, "logo");
    const update = await prisma.company.update({
      where: {
        id: company.id,
      },
      data: {
        logo,
      },
    });
    return update;
  }

  async myCompany(user: IUser) {
    if (!user.employer) {
      throw new Error("Employer information is missing");
    }
    const company = await this.findCompanyById(user.employer.id!);
    return company;
  }

  async remove(user: IUser) {
    if (!user.employer) {
      throw new Error("Employer information is missing");
    }
    const company = await this.findCompanyById(user.employer.id, false, {
      confirm: true,
    });

    const remove = await prisma.company.delete({
      where: {
        id: company.id,
      },
    });
  }

  async getCompany(id: number) {
    const company = await this.findCompanyById(id);

    return company;
  }

  async getAllCompany(sort: Sort = Sort.ASC) {
    const companies = await prisma.company.findMany({
      where: {
        confirm: true,
      },
      orderBy: {
        createdAt: sort,
      },
    });
    return companies;
  }

  async findCompanyById(id: number, confirm: boolean = true, OR: Object = {}) {
    const company = await prisma.company.findUnique({
      where: {
        id,
        OR: [
          {
            confirm,
          },
          OR,
        ],
      },
      select: {
        id: true,
        name: true,
        logo: true,
        updatedAt: true,
        description: true,
        website: true,
        industry: true,
        about: true,
        company_size: true,
        location: true,
        confirm: false,
        _count: true,
        createdAt: true,
        Job: true,
      },
    });
    if (!company)
      throw ResponseHandler(
        StatusCodes.NOT_FOUND,
        false,
        null,
        "Company not found"
      );
    return company;
  }

  async findEmployerByUserId(userId: number) {
    const employer = await prisma.employer.findUnique({
      where: {
        userId,
      },
      include: {
        Company: true,
      },
    });
    if (!employer)
      throw ResponseHandler(
        StatusCodes.UNAUTHORIZED,
        false,
        null,
        "you not allowd to create company!"
      );
    return employer;
  }
}
