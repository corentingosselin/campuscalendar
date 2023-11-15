import { IsArray, IsString } from "class-validator";
import { ClassYear } from "../interfaces/campus.interface";

type DEFAULT_OMIT = 'created_at' | 'updated_at' | 'id';

export class SchoolDto {
  @IsString()
  name!: string;
  classYear!: ClassYearDto[];
}

export class ClassYearDto implements Omit<ClassYear, DEFAULT_OMIT> {

  @IsString()
  name!: string;

  @IsArray()
  subjects!: string[];
}
