import { Router } from "express";
import homeRouter from "../modules/home/home.routes";
import authRouter from "../modules/auth/auth.routes";
const router: Router = Router();
router.use("/", homeRouter);
router.use("/auth", authRouter);
export default router;
