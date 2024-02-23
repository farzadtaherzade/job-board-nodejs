import { Router } from "express";
import { AuthController } from "./auth.controller";
import { SignupDto } from "./dtos/signup.dto";
import ValidateBody from "../../middlewares/validation";
import { SigninDto } from "./dtos/signin.dto";

const authRouter: Router = Router();

const authController: AuthController = new AuthController();

authRouter.post("/sign-up", ValidateBody(SignupDto), authController.signup);
authRouter.post("/sign-in", ValidateBody(SigninDto), authController.signin);
authRouter.post("/refresh", authController.refreshToken);

export default authRouter;
