import { Router } from "express";
import { AuthController } from "./auth.controller";
import { SignupDto } from "./dtos/signup.dto";
import ValidateBody from "../../middlewares/validation";
import { SigninDto } from "./dtos/signin.dto";

const authRouter: Router = Router();

const authController: AuthController = new AuthController();

// route for signin and signup jobseekers
authRouter.post(
  "/job-seeker/sign-up",
  ValidateBody(SignupDto),
  authController.signup
);
authRouter.post(
  "/job-seeker/sign-in",
  ValidateBody(SigninDto),
  authController.signin
);

// route for signin and signup employers
authRouter.post(
  "/employer/sign-up",
  ValidateBody(SignupDto),
  authController.signup
);
authRouter.post(
  "/employer/sign-in",
  ValidateBody(SigninDto),
  authController.signin
);

authRouter.post("/refresh", authController.refreshToken);

export default authRouter;
