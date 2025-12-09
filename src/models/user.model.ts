// src/modules/user/entities/user.model.ts
import { Schema, model, Document } from "mongoose";
import { IUser } from "../types/entities/IUser";
import { Status } from "../shared/constant/status";
import { Role } from "../shared/constant/roles";

// Extend Mongoose Document with IUser
// export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageKey: {
      type: String,
      default: "",
    },
    referralCode: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("User", userSchema);
