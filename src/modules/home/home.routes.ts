import { Router } from "express";
import { homeController } from "./home.controller";
import { Authorization } from "../../middlewares/authorization";

const homeRouter: Router = Router();

homeRouter.get("/", Authorization, homeController.helloWorld);

export default homeRouter;
