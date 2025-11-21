import { Role } from "../../../shared/constant/roles";


/**
 * this Dto is using user and admin
 */

export interface userDto{
  email: string;
  userName: string;
  
  phoneNumber: string;
  password: string;
  referralCode?: string;
  role: Role.USER;
  imageKey?: string;       
}
