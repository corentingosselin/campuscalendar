import { IsArray, IsDefined, IsString } from "class-validator";
import { AdminDto } from "./user.dto";

type DEFAULT_OMIT = 'created_at' | 'updated_at' | 'id';

export class SchoolDto  {
  @IsString()
  name!: string;
  classYears!: ClassYearDto[];
}

export interface ClassYearConfig {
  name: string;
  subjects: string[];
}

export class ClassYearDto implements Omit<ClassYearConfig, DEFAULT_OMIT> {
  @IsString()
  name!: string;
  @IsArray()
  subjects!: string[];
}

export class SchoolConfigurationDto {
  school!: SchoolDto;
  campus!: string[];
}

export class SetupSchoolDto {
  @IsDefined()
  admin!: AdminDto;
  @IsDefined()
  school!: SchoolDto;
  @IsArray()
  campus!: string[];
}
