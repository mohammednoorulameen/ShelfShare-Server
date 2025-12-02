import { ObjectId } from "mongoose";
import { Status } from "../../../shared/constant/status";
import { Role } from "../../../shared/constant/roles";

export interface UserResponseDto {
  _id: string | ObjectId;
  userId: string;
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;
  referralCode?: string | undefined;
  imageKey?: string;
  status: Status;
  role: Role;
  isEmailVerified: boolean;
  isAdmin?: boolean;
  createdAt: Date;
}

export interface UpdateUserinfoDto {
  userId: string;
  userName?: string;
  phoneNumber?: string;
  imageKey?: string;
}

export interface UpdateUserPasswordDto{
    userId : string;
    oldPassword: string;
    newPassword : string;
}