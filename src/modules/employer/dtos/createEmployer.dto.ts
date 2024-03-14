import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmployerDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  userId: number;
}
