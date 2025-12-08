import { Role } from "../../shared/constant/roles";
import { Status } from "../../shared/constant/status";
import { VendorRequestDto } from "../dtos/vendor/Request.dto";
import { VendorResponseDto } from "../dtos/vendor/Response.dto";
import { IVendor } from "../entities/IVendor";
import { v4 as uuidv4 } from "uuid";


export class VendorMapper {
  static toEntity(dto: VendorRequestDto): Partial<IVendor> {
    return {
      vendorId: uuidv4(),
      email: dto.email,
      bussinessName: dto.bussinessName,
      phoneNumber: dto.phoneNumber,
      password: dto.password,
      imageKey: dto.imageKey ?? "",
      role: Role.VENDOR,
    };
  }


  static toResponse(entity: IVendor): VendorResponseDto {
    return {
        _id: entity._id,
        vendorId: entity.vendorId,
        email: entity.email,
        bussinessName: entity.bussinessName,
        phoneNumber: entity.phoneNumber,
        imageKey: entity.imageKey,
        // isActive: entity.isActive,
        status : entity.status,
        role : entity.role,
        isAdminVerifiedStatus: entity.isAdminVerifiedStatus,
        adminRejectReason:entity.adminRejectReason,
        isEmailVerified : entity.isEmailVerified,
        createdAt: entity.createdAt,
        joinedAt: entity.joinedAt

    }
  }

  

  static toResponseList(vendors: IVendor[]): VendorResponseDto[] {
    return vendors.map((v) => VendorMapper.toResponse(v));
  }
}



// import { Role } from "../../shared/constant/roles";
// import { Status } from "../../shared/constant/status";
// import { VendorRequestDto } from "../dtos/vendor/Request.dto";
// import { VendorResponseDto } from "../dtos/vendor/Response.dto";
// import { IVendor } from "../entities/IVendor";
// import { v4 as uuidv4 } from "uuid";


// export class VendorMapper {
//   static toEntity(dto: VendorRequestDto): Partial<IVendor> {
//     return {
//       vendorId: uuidv4(),
//       email: dto.email,
//       bussinessName: dto.bussinessName,
//       phoneNumber: dto.phoneNumber,
//       password: dto.password,
//       imageKey: dto.imageKey ?? "",
//       role: Role.VENDOR,
//     };
//   }


//   static toResponse(entity: IVendor): VendorResponseDto {
//     return {
//         _id: entity._id,
//         vendorId: entity.vendorId,
//         email: entity.email,
//         bussinessName: entity.bussinessName,
//         phoneNumber: entity.phoneNumber,
//         imageKey: entity.imageKey,
//         // isActive: entity.isActive,
//         status : entity.status,
//         role : entity.role,
//         isAdminVerified: entity.isAdminVerified,
//         isEmailVerified : entity.isEmailVerified,
//         createdAt: entity.createdAt,
//         joinedAt: entity.joinedAt

//     }
//   }

  

//   static toResponseList(vendors: IVendor[]): VendorResponseDto[] {
//     return vendors.map((v) => VendorMapper.toResponse(v));
//   }
// }
