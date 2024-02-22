import { Router } from "express";
import { AuthController } from "./auth.controller";
import { SignupDto } from "./dtos/signup.dto";
import ValidateBody from "../../middlewares/validation";

const authRouter: Router = Router();

const authController: AuthController = new AuthController();

authRouter.post("/sign-up", ValidateBody(SignupDto), authController.signup);
authRouter.post("/sign-in", authController.signin);

export default authRouter;
