import {
  IsArray,
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateResumeDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  eduction: string;

  @IsArray({ context: "string" })
  @IsNotEmpty()
  skills: string[];

  @IsArray({ context: "string" })
  @IsNotEmpty()
  projects: string[];

  @IsString()
  @IsNotEmpty()
  neighbourhood: string;

  @IsString()
  @IsNotEmpty()
  desired_job_title: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEmpty()
  userId: number;
}
