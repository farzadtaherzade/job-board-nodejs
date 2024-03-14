import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { CompanyService, Sort } from "./company.service";
import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../../helper/response";
import { UpdateCompanyDto } from "./dtos/updateCompany.dto";
import { UserWithEmployer } from "../../types/type";

const companyService: CompanyService = new CompanyService();

export class CompanyController {
  async createCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserWithEmployer | undefined = req.user;
      const file: Express.Multer.File | undefined = req.file;
      const createCompanyDto = req.body;
      const createCompany = await companyService.createCompany(
        createCompanyDto,
        user!,
        file!
      );
      return res
        .status(StatusCodes.CREATED)
        .json(ResponseHandler(StatusCodes.CREATED, true, createCompany, null));
    } catch (error) {
      next(error);
    }
  }

  async myCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserWithEmployer | undefined = req.user;
      const company = await companyService.myCompany(user!);

      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, company, null));
    } catch (error) {
      next(error);
    }
  }

  async getCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const company = await companyService.getCompany(+id);

      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, company, null));
    } catch (error) {
      next(error);
    }
  }

  async getAllCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const sort: Sort = req.query?.sort as Sort;
      const companies = await companyService.getAllCompany(sort);
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, companies, null));
    } catch (error) {
      next(error);
    }
  }

  async updateCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserWithEmployer | undefined = req.user;
      const updateCompanyDto: UpdateCompanyDto = req.body;
      const updateCompany = await companyService.updateCompany(
        updateCompanyDto,
        user!
      );
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, updateCompany, null));
    } catch (error) {
      next(error);
    }
  }

  async changeLogo(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserWithEmployer | undefined = req.user;
      const file: Express.Multer.File | undefined = req.file;
      const changeLogo = await companyService.changeLogo(user!, file!);
      return res
        .status(StatusCodes.OK)
        .json(ResponseHandler(StatusCodes.OK, true, changeLogo, null));
    } catch (error) {
      next(error);
    }
  }
}
