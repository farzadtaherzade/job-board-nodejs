import { Role } from "@prisma/client";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class SigninDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  otp: number;
}
