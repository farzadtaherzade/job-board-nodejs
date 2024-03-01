import { Router } from "express";
import homeRouter from "../modules/home/home.routes";
import authRouter from "../modules/auth/auth.routes";
import accountRouter from "../modules/account/account.routes";
const router: Router = Router();
router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/user", accountRouter);
export default router;
