import { AdminVerifyStatus } from "../../shared/constant/status";
import { VendorResponseDto } from "../dtos/vendor/Response.dto";

export interface IVendorService {
  getAllVendors(
    page?: number,
    limit?: number
  ): Promise<{
    data: VendorResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;




toggleAdminVerification(
  vendorId: string,
  action: AdminVerifyStatus,
  reason?: string
): Promise<VendorResponseDto>;

  toggleAdminBlockVendor(vendorId:string) : Promise<VendorResponseDto>
  getVendorById(vendorId : string) : Promise <VendorResponseDto>
  
}




// import { VendorResponseDto } from "../dtos/vendor/Response.dto";

// export interface IVendorService {
//   getAllVendors(
//     page?: number,
//     limit?: number
//   ): Promise<{
//     data: VendorResponseDto[];
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//   }>;

//   toggleAdminVerification(vendorId:string) :Promise<VendorResponseDto>
//   toggleAdminBlockVendor(vendorId:string) : Promise<VendorResponseDto>
//   getVendorById(vendorId : string) : Promise <VendorResponseDto>
  
// }

