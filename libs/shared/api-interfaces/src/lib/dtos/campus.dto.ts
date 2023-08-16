import { IsString } from "class-validator";
import { Campus } from "../interfaces/campus.interface";



type DEFAULT_OMIT = 'created_at' | 'updated_at' | 'id';

export class CreateCampusDto implements Omit<Campus, DEFAULT_OMIT | 'role'> {
  @IsString()
  name!: string;
}

// add other dtos related to campus after this line