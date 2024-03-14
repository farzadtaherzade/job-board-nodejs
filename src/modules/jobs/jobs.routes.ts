import { Router } from "express";
import { JobController } from "./jobs.controller";
import { Authorization } from "../../middlewares/authorization";
import ValidateBody from "../../middlewares/validation";
import { CreateJobDto } from "./dtos/createJob.dto";

const jobRouter: Router = Router();
const jobController: JobController = new JobController();

jobRouter.post(
  "/",
  Authorization("EMPLOYER"),
  ValidateBody(CreateJobDto),
  jobController.create
);
jobRouter.get("/", jobController.findAll);
jobRouter.get("/:id", jobController.find);

export default jobRouter;
