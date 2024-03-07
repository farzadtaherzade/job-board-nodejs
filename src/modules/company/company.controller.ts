import { NextFunction, Request, Response } from "express";

export class CompanyController {
  async createCompany(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
