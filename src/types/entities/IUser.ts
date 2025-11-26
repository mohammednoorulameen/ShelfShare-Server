import { ObjectId } from "mongoose";
import { Role } from "../../shared/constant/roles";
import { Status } from "../../shared/constant/status";



export interface IUser {
  _id: string | ObjectId
  userId: string;
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;
  imageKey: string;
  referralCode: string ;
  role : Role;
  status: Status;        
  isEmailVerified: boolean;
  isAdmin?: boolean;
  createdAt: Date;           
}
