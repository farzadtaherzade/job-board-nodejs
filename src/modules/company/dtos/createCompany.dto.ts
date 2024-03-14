import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  @IsNotEmpty()
  @IsString()
  industry: string;

  @IsNotEmpty()
  @IsString()
  about: string;

  @IsString()
  @IsNotEmpty()
  company_size: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  logo: string;
  employerId: number;
}
