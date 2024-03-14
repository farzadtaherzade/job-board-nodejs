import { JobStatus } from "@prisma/client";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  work_days: string;

  @IsString()
  benefits: string;

  @IsArray()
  @IsNotEmpty()
  skill_required: string[];

  @IsString()
  @IsNotEmpty()
  salary: string;

  @IsString()
  @IsNotEmpty()
  education_required: string;

  @IsString()
  @IsNotEmpty()
  conditions: string;

  @IsString()
  @IsNotEmpty()
  status: JobStatus;

  @IsBoolean()
  @IsNotEmpty()
  open: boolean;

  employerId: number;
  companyId: number;
}
