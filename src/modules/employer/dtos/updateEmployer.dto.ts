import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateEmployerDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
