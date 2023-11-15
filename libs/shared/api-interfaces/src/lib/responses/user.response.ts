import { Admin } from "@nestjs/microservices/external/kafka.interface";

export type AdminResponse = Omit<Admin, 'confirmPassword'>;
export type AdminAccountResponse = Omit<Admin, 'password'>;

