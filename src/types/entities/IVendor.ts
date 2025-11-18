import { Role } from "../../shared/constant/roles";
import { Status } from "../../shared/constant/status";

export interface IVendor{
     vendorId: string;
     email: string;
     bussinessName: string;
     phoneNumber: string;
     password : string;
     imageKey: string;
     isActive: boolean;
     status : Status;
     role: Role;
     isVerified : boolean;
     createdAt: Date;     
     joinedAt : Date
}