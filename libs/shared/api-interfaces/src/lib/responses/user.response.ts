import { Administrator } from "../interfaces/user.interface";

export type AdminResponse = Omit<Administrator, 'confirmPassword'>;
export type AdminAccountResponse = Omit<Administrator, 'password'>;

