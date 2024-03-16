import { JobRequestStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class ResponseJobRequestDto {
    @IsString()
    @IsNotEmpty()
    message: string

    @IsEnum(JobRequestStatus)
    @IsNotEmpty()
    status: JobRequestStatus
}