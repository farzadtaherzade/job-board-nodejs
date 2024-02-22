import { Role } from "@prisma/client";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from "class-validator";

export class SignupDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minLowercase: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsMobilePhone("fa-IR")
  phone: string;

  @IsEnum({
    JOBSEEKE: Role.JOBSEEKER,
    EMPLOYER: Role.EMPLOYER,
  })
  role: Role;
}
