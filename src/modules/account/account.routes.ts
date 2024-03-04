import { Router } from "express";
import { AccountController } from "./account.controller";
import { Authorization } from "../../middlewares/authorization";
import { UpdateResumeDto } from "./dtos/updateResume.dto";
import ValidateBody from "../../middlewares/validation";
import { upload } from "../../utils/multer";

const accountRouter: Router = Router();
const accountController: AccountController = new AccountController();

accountRouter.get("/me", Authorization, accountController.getMe);
accountRouter.get("/resume", Authorization, accountController.getResume);
accountRouter.put(
  "/resume",
  Authorization,
  ValidateBody(UpdateResumeDto),
  accountController.updateResume
);
accountRouter.patch(
  "/upload/pic",
  Authorization,
  upload.single("pic"),
  accountController.uploadProfile
);
accountRouter.patch(
  "/upload/resume",
  Authorization,
  upload.single("resume"),
  accountController.uploadProfile
);

export default accountRouter;
