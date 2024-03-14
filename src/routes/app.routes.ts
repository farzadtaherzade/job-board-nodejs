import { Router } from "express";
import homeRouter from "../modules/home/home.routes";
import authRouter from "../modules/auth/auth.routes";
import accountRouter from "../modules/account/account.routes";
import employerRouter from "../modules/employer/employer.routes";
import companyRouter from "../modules/company/company.routes";
import jobRouter from "../modules/jobs/jobs.routes";
const router: Router = Router();
router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/user", accountRouter);
router.use("/employer", employerRouter);
router.use("/company", companyRouter);
router.use("/job", jobRouter);

export default router;
