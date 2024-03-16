import { Router } from "express";
import { AdminController } from "./admin.controller";

const adminRouter: Router = Router();
const adminController: AdminController = new AdminController();

export default adminRouter;
