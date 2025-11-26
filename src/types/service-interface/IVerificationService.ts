import { Role } from "../../shared/constant/roles";


export interface IVerificationServices{
    sendVerificationEmail(eamil: string, role : Role,id?: string) : Promise<void>;
    verifyEmail(token:string): Promise<{message : string, role: Role}>;
    sendForgotPassword(email:string,role : Role):Promise<void>;
    verifyForgotToken(token: string): Promise<{ email: string; role: Role }>;
    resetPassword(token: string, newPassword: string):Promise<void>;
}
