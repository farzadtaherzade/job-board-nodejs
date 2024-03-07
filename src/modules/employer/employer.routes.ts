import { Router } from "express";
import { EmployerController } from "./employer.controller";

const employerRouter: Router = Router();
const employerController: EmployerController = new EmployerController();

export default employerRouter;
