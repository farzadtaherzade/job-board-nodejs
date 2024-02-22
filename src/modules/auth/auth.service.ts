import { User } from "@prisma/client";
import { AccountService } from "../account/account.service";
import { SigninDto } from "./dtos/signin.dto";
import { SignupDto } from "./dtos/signup.dto";
import * as bcrypt from "bcrypt";
import ResponseHandler from "../../helper/response";
import { StatusCodes } from "http-status-codes";
import { sendOtp } from "../../helper/sendOtp";
import { getTtlOfKey } from "../../helper/redis";

const accountService = new AccountService();

export class AuthService {
  async signup(signupDto: SignupDto) {
    const salt = bcrypt.genSaltSync(10);
    signupDto.password = bcrypt.hashSync(signupDto.password, salt);
    const user = await accountService.createUser(signupDto);
    return "created";
  }
  async signin(signinDto: SigninDto): Promise<string> {
    const ex_otp: any = process.env.EXPIRED_OTP_TIME;
    const error = ResponseHandler(
      StatusCodes.BAD_REQUEST,
      false,
      null,
      "email or password is wrong"
    );
    const user = await accountService.findUserByEmail(signinDto.email);
    if (!user) throw error;
    const comparePassword = bcrypt.compareSync(
      signinDto.password,
      user.password
    );
    if (!comparePassword) throw error;
    if (signinDto.otp) {
      
    }
    const sendOtpResult = await sendOtp(user.email);
    if (sendOtpResult === 0) {
      const ttl = await getTtlOfKey(user.email);
      return `code already send to your account! code was sended ${
        ex_otp * 60 - ttl
      } second ago use same one`;
    }

    return "otp sended successfully";
  }
}
