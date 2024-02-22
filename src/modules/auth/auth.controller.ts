import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dtos/signup.dto";
import ResponseHandler from "../../helper/response";
import { StatusCodes } from "http-status-codes";
import { SigninDto } from "./dtos/signin.dto";

const authService: AuthService = new AuthService();

export class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const signupDto: SignupDto = req.body;
      await authService.signup(signupDto);
      return res
        .status(StatusCodes.OK)
        .json(
          ResponseHandler(
            StatusCodes.OK,
            true,
            "your account created successfully. go and signin!",
            null
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const signinDto: SigninDto = req.body;
      const message: string = await authService.signin(signinDto);
      return res
        .status(200)
        .json(ResponseHandler(StatusCodes.OK, true, message, null));
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req: Request, res: Response, next: NextFunction) {}
}
