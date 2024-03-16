import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../../helper/response";

const adminService: AdminService = new AdminService();

export class AdminController {
  async getCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const confirm: boolean = req.query.confirm === 'true' ? true : false
      const data = await adminService.getCompanies(confirm)

      return res.status(StatusCodes.OK).json(ResponseHandler(StatusCodes.OK, true, data, null))
    } catch (error) {
      next(error)
    }
  }

  async confirmCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = +req.params.id;
      const data = await adminService.confirmCompany(id)

      return res.status(StatusCodes.OK).json(ResponseHandler(StatusCodes.OK, true, data, null))
    } catch (error) {
      next(error)
    }
  }
}
