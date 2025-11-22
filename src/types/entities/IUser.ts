import { Role } from "../../shared/constant/roles";
import { Status } from "../../shared/constant/status";



export interface IUser {
  userId: string;
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;
  imageKey: string;
  referralCode?: string;
  role : Role;
  status: Status;        
  isEmailVerified: boolean;
  isAdmin?: boolean;
  createdAt: Date;           
}
