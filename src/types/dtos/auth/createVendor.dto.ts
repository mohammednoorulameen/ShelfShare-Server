import { Role } from "../../../shared/constant/roles";

/**
 * this is Vendor Dto 
 */
export interface VendorDto{
    email : string;
    bussinessName: string;
    phoneNumber: string;
    password: string;
    imageKey: string;
    role : Role.VENDOR
}

