import { Experience, JobStatus, Type } from "@prisma/client";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  short_desc: string;

  @IsString()
  @IsOptional()
  work_days: string;

  @IsArray()
  @IsOptional()
  skill_required: string[];

  @IsNumber()
  @IsOptional()
  salary: number;

  @IsEnum(JobStatus)
  @IsOptional()
  status: JobStatus;

  @IsEnum(Experience)
  @IsOptional()
  experience: Experience;

  @IsEnum(Type)
  @IsOptional()
  type: Type;
}
