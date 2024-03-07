import { Router } from "express";
import { CompanyController } from "./company.controller";

const companyRouter: Router = Router();
const companyController: CompanyController = new CompanyController();

export default companyRouter;
