import { Router } from "express";
import { AccountController } from "./account.controller";
import { Authorization } from "../../middlewares/authorization";
import { UpdateResumeDto } from "./dtos/updateResume.dto";
import ValidateBody from "../../middlewares/validation";

const accountRouter: Router = Router();
const accountController: AccountController = new AccountController();

accountRouter.get("/me", Authorization, accountController.getMe);
accountRouter.put(
  "/resume",
  Authorization,
  ValidateBody(UpdateResumeDto),
  accountController.updateResume
);

export default accountRouter;
