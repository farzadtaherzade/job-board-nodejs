import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCompanyDto {
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

  @IsNumber()
  @IsNotEmpty()
  company_size: number;

  @IsNotEmpty()
  @IsString()
  location: string;
}
