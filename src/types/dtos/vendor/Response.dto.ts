import { ObjectId } from "mongoose";
import { Role } from "../../../shared/constant/roles";
import { AdminVerifyStatus, Status } from "../../../shared/constant/status";


export interface VendorResponseDto {
  _id: string | ObjectId;
  vendorId: string;
  email: string;
  bussinessName: string;
  phoneNumber: string;
  imageKey?: string;
  // isActive: boolean;
  status: Status;
  role: Role;
  isEmailVerified: boolean;
  isAdminVerifiedStatus : AdminVerifyStatus;
  adminRejectReason : string | null,
  createdAt: Date;
  joinedAt: Date;
}











// import { ObjectId } from "mongoose";
// import { Role } from "../../../shared/constant/roles";
// import { Status } from "../../../shared/constant/status";


// export interface VendorResponseDto {
//   _id: string | ObjectId;
//   vendorId: string;
//   email: string;
//   bussinessName: string;
//   phoneNumber: string;
//   imageKey?: string;
//   // isActive: boolean;
//   status: Status;
//   role: Role;
//   isEmailVerified: boolean;
//   isAdminVerified: boolean;
//   createdAt: Date;
//   joinedAt: Date;
// }
