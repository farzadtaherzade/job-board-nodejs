import { Router } from "express";
import { AdminController } from "./admin.controller";
import { Authorization } from "../../middlewares/authorization";

const adminRouter: Router = Router();
const adminController: AdminController = new AdminController();

adminRouter.get('/companies', Authorization('ADMIN'), adminController.getCompanies)
adminRouter.patch('/companies/:id', Authorization('ADMIN'), adminController.confirmCompany)

export default adminRouter;
