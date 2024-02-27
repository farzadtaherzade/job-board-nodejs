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
      signupDto.role = "JOBSEEKER";
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
      const data = await authService.signin(signinDto, "JOBSEEKER");
      return res
        .status(200)
        .json(ResponseHandler(StatusCodes.OK, true, data, null));
    } catch (error) {
      next(error);
    }
  }
  async signupEmployers(req: Request, res: Response, next: NextFunction) {
    try {
      const signupDto: SignupDto = req.body;
      signupDto.role = "EMPLOYER";
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

  async signinEmployers(req: Request, res: Response, next: NextFunction) {
    try {
      const signinDto: SigninDto = req.body;
      const data = await authService.signin(signinDto, "EMPLOYER");
      return res
        .status(200)
        .json(ResponseHandler(StatusCodes.OK, true, data, null));
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token }: { token: string } = req.body;
      if (!token)
        throw ResponseHandler(
          StatusCodes.BAD_REQUEST,
          false,
          null,
          "token must be provided"
        );
      const data = await authService.refreshToken(token);
      return res
        .status(200)
        .json(ResponseHandler(StatusCodes.OK, true, data, null));
    } catch (error) {
      next(error);
    }
  }
}
