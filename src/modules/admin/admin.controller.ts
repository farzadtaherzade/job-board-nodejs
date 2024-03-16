import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import { User } from "@prisma/client";
import { IUser } from "../../types/type";

const adminService: AdminService = new AdminService();

export class AdminController {
  async getCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const admin: User | undefined = req.user
    } catch (error) {
      next(error)
    }
  }
}
