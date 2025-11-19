import { Role } from "../../shared/constant/roles";


export interface IVerificationServices{
    sendVerificationEmail(eamil: string, role : Role,id?: string) : Promise<void>;
    verifyEmail(token:string): Promise<void>
}