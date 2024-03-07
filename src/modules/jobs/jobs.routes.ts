import { Router } from "express";
import { JobController } from "./jobs.controller";

const JobRouter: Router = Router();
const jobController: JobController = new JobController();

export default JobRouter;
