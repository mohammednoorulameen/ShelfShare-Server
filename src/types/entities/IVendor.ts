import { ObjectId } from "mongoose";
import { Role } from "../../shared/constant/roles";
import { AdminVerifyStatus, Status } from "../../shared/constant/status";

export interface IVendor{
     _id: string | ObjectId
     vendorId: string;
     email: string;
     bussinessName: string;
     phoneNumber: string;
     password : string;
     imageKey: string;
     // isActive: boolean;
     status : Status;
     role: Role;
     rejectReason?: string;
     isEmailVerified : boolean;
     isAdminVerifiedStatus : AdminVerifyStatus;
     adminRejectReason : string | null,
     createdAt: Date;     
     joinedAt : Date
}











// import { ObjectId } from "mongoose";
// import { Role } from "../../shared/constant/roles";
// import { Status } from "../../shared/constant/status";

// export interface IVendor{
//      _id: string | ObjectId
//      vendorId: string;
//      email: string;
//      bussinessName: string;
//      phoneNumber: string;
//      password : string;
//      imageKey: string;
//      // isActive: boolean;
//      status : Status;
//      role: Role;
//      rejectReason?: string;
//      isEmailVerified : boolean;
//      isAdminVerified : boolean;
//      createdAt: Date;     
//      joinedAt : Date
// }
