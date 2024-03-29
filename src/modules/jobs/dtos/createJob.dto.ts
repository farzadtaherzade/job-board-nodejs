import { Experience, JobStatus, Type } from "@prisma/client";
import {
  IsArray,
  IsBoolean,
  IsEnum,
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
  short_desc: string;

  @IsString()
  @IsNotEmpty()
  work_days: string;

  @IsArray()
  @IsNotEmpty()
  skill_required: string[];

  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @IsEnum(JobStatus)
  @IsNotEmpty()
  status: JobStatus;

  @IsEnum(Experience)
  @IsNotEmpty()
  experience: Experience;

  @IsEnum(Type)
  @IsNotEmpty()
  type: Type;

  employerId: number;
  companyId: number;
}
