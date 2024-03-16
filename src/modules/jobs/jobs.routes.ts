import { Router } from "express";
import { JobController } from "./jobs.controller";
import { Authorization } from "../../middlewares/authorization";
import ValidateBody from "../../middlewares/validation";
import { CreateJobDto } from "./dtos/createJob.dto";
import { UpdateJobDto } from "./dtos/updateJob.dto";
import { ResponseJobRequestDto } from "./dtos/responseJob.dto";

const jobRouter: Router = Router();
const jobController: JobController = new JobController();

jobRouter.post(
  "/",
  Authorization("EMPLOYER"),
  ValidateBody(CreateJobDto),
  jobController.create
);

jobRouter.post(
  "/:id/send-resume",
  Authorization("JOBSEEKER"),
  jobController.sendResume
);

jobRouter.put(
  "/:id",
  Authorization("EMPLOYER"),
  ValidateBody(UpdateJobDto),
  jobController.update
);

jobRouter.put(
  "/:jobId/answer/:id",
  Authorization("EMPLOYER"),
  ValidateBody(ResponseJobRequestDto),
  jobController.answerJobRequest
);

jobRouter.get("/:id/received", Authorization("EMPLOYER"), jobController.receivedResume);

jobRouter.get("/:id/history", Authorization("JOBSEEKER"), jobController.sentHistory);

jobRouter.get("/", jobController.findAll);
jobRouter.get("/:id", jobController.find);

export default jobRouter;