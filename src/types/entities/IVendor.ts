import { Status } from "../../shared/constant/status";

export interface Vendor{
     userId: string;
     email: string;
     bussinessName: string;
     phoneNumber: string;
     password : string;
     imgeKey: string;
     isActive: boolean;
     status : Status;
     isVerified : boolean;
     createdAt: Date;     
     joinedAt : Date
}