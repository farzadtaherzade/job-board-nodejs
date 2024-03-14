import { Router } from "express";
import { EmployerController } from "./employer.controller";
import { Authorization } from "../../middlewares/authorization";
import ValidateBody from "../../middlewares/validation";
import { CreateEmployerDto } from "./dtos/createEmployer.dto";
import { UpdateEmployerDto } from "./dtos/updateEmployer.dto";

const employerRouter: Router = Router();
const employerController: EmployerController = new EmployerController();

employerRouter.post(
  "/",
  ValidateBody(CreateEmployerDto),
  Authorization("EMPLOYER"),
  employerController.createEmployer
);

employerRouter.put(
  "/",
  ValidateBody(UpdateEmployerDto),
  Authorization("EMPLOYER"),
  employerController.updateEmployer
);

employerRouter.get("/me", Authorization("EMPLOYER"), employerController.getMe);
employerRouter.get(
  "/detail",
  Authorization("EMPLOYER"),
  employerController.getDetail
);

export default employerRouter;
