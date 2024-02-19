import { Router } from "express";
import homeRouter from "../modules/home/home.router";
const router: Router = Router();
router.use("/", homeRouter);
export default router;
