import { inject, injectable } from "tsyringe";
import { IVendorRepository } from "../types/repository-interface/IVendorRepository";
import { IVendorService } from "../types/service-interface/IVendorService";
import { VendorMapper } from "../types/mapper/vendor.mapper";
import { VendorResponseDto } from "../types/dtos/vendor/Response.dto";
import AppError from "../shared/utils/App.Error";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { IVendor } from "../types/entities/IVendor";



@injectable()
export class VendorService implements IVendorService {
  constructor(
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository
  ) {}

  /*-----------------
   Get all vendors with pagination
 -----------------------------------------------*/


  async getAllVendors(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const { data, total, totalPages } =
      await this._vendorRepository.findWithPagination(
        {},
        { skip, limit, sort: { createdAt: -1 } }
      );

    return {
      data: VendorMapper.toResponseList(data),
      total,
      page,
      limit,
      totalPages,
    };
  }


   /*----------
    toggle admin verification
   ------------------------------------*/

    async toggleAdminVerification(vendorId: string): Promise<VendorResponseDto> {
       const vendor = await this._vendorRepository.findOne({_id:vendorId})

       if(!vendor){
        throw new AppError(ERROR_MESSAGES.ACCOUNT_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
       }

       const updateVendor = await this._vendorRepository.updateById(vendorId,{
        isAdminVerified: !vendor.isAdminVerified
       });

       return VendorMapper.toResponse(updateVendor!)
    }


   /*-----------
    toggle admin change status
   --------------------------------*/

   async toggleAdminBlockVendor(vendorId:string): Promise<VendorResponseDto>{
    const vendor = await this._vendorRepository.findOne({_id : vendorId})

    if(!vendorId){
      throw new AppError(ERROR_MESSAGES.ACCOUNT_NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }
    let newStatus = vendor?.status === "active" ? "blocked" : "active"

    const updateData : any = {status : newStatus};

    if(newStatus === 'blocked'){
      updateData.isAdminVerified = false
    }

    const updateVendorStatus = await this._vendorRepository.updateById(
      vendorId,
      updateData
    )
    return VendorMapper.toResponse(updateVendorStatus as IVendor)
   }
}
