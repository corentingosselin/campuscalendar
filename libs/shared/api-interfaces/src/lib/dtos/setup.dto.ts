import { SchoolDto } from "./campus.dto";
import { AdminDto } from "./user.dto";


export class SetupDto  {

    admin?: AdminDto;

    school?: SchoolDto;

    campus?: string[];

}
