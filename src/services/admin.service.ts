// import { inject, injectable } from "tsyringe";
// import { IVendorRepository } from "../types/repository-interface/IVendorRepository";
// import { VendorResponseDto } from "../types/dtos/vendor/ResponseDTO";
// import { VendorMapper } from "../types/mapper/vendorMapper";
// import { IAdminService } from "../types/service-interface/IAdminService";





// @injectable()
// export class AdminService implements IAdminService{
//     constructor(
//         @inject("IVendorRepository") private _vendorRepository:IVendorRepository
//     ){}




//   /*-----------------
//    Get all Vendors in Admin Pannel
//  -----------------------------------------------*/

// // async getAllVendors(page =  1, limit =  10): Promise<{ data: VendorResponseDto[]; total: number; page: number; limit: number; }> {
// //     const skip = (page-1)*limit;
// //     const {data, totla} = await this._vendorRepository.findWithPagination(
// //         {},
// //         skip,
// //         limit,
// //         sort:{ createdAt: 1},
// //     );

// //     const mapped = VendorMapper.toResponseList(data)
// //     return {
// //         data:mapped,
// //         total,
// //         page,
// //         limit,
// //     }

// // }

// async getAllVendors(
//   page = 1,
//   limit = 10
// ): Promise<{
//   data: VendorResponseDto[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }> {
//   const skip = (page - 1) * limit;

//   const { data, total, totalPages } =
//     await this._vendorRepository.findWithPagination(
//       {},
//       {
//         skip,
//         limit,
//         sort: { createdAt: -1 },
//       }
//     );

//   return {
//     data: VendorMapper.toResponseList(data),
//     total,
//     page,
//     limit,
//     totalPages,
//   };
// }






// }