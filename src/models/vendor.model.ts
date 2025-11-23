import { Document, model, Schema } from "mongoose";
import { IVendor } from "../types/entities/IVendor";
import { Status } from "../shared/constant/status";
import { Role } from "../shared/constant/roles";



// export interface IVentorDocument extends Omit<IVendor , "_id">,Document {}
// export interface IVentorDocument extends IVendor, Document {}

const vendorSchema = new Schema<IVendor>(
    {
        vendorId:{
            type:String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required:true,
            unique: true,
            trim :  true,
            lowercase: true
        },
        bussinessName:{
            type: String,
            required: true,
            trim : true
        },
        phoneNumber:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required : true,
        },
        imageKey:{
            type : String,
            default: ""
        },
        // isActive:{
        //     type: Boolean,
        //     default: true,
        // },
        status:{
            type: String,
            enum: Object.values(Status),
            default: Status.ACTIVE
        },
        isEmailVerified:{
            type:Boolean,
            default: false,  
        },
        isAdminVerified:{
            type:Boolean,
            default: false,  
        },
        createdAt:{
            type: Date,
            default: Date.now
        },
        role:{
            type: String,
            enum: Object.values(Role),
            default: Role.VENDOR
        },
        joinedAt:{
            type: Date,
            default: Date.now
        }
    },
   {
     timestamps: true, 
   }
)

export const VendorModel = model<IVendor>('Vendor', vendorSchema)