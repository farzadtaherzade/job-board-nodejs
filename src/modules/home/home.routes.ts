import { Router } from "express";
import { homeController } from "./home.controller";

const homeRouter: Router = Router();

homeRouter.get("/", homeController.helloWorld);

export default homeRouter;
