import { inject, injectable } from "tsyringe";
import { IVendorRepository } from "../types/repository-interface/IVendorRepository";
import { IVendorService } from "../types/service-interface/IVendorService";
import { VendorMapper } from "../types/mapper/vendor.mapper";
import { VendorResponseDto } from "../types/dtos/vendor/Response.dto";
import AppError from "../shared/utils/App.Error";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { IVendor } from "../types/entities/IVendor";
import { AdminVerifyStatus } from "../shared/constant/status";

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

  async toggleAdminVerification(
    vendorId: string,
    action: AdminVerifyStatus,
    reason?: string
  ): Promise<VendorResponseDto> {
    console.log("check the id here", vendorId);

    const vendor = await this._vendorRepository.findOne({ vendorId: vendorId });

    if (!vendor) {
      throw new AppError(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    let newStatus = vendor.isAdminVerifiedStatus;
    let rejectReason: string | null = null;

    if (action === AdminVerifyStatus.APPROVED) {
      newStatus = AdminVerifyStatus.APPROVED;
    }

    if (action === AdminVerifyStatus.REJECTED) {
      if (!reason) {
        throw new AppError(
          "Rejection reason is required",
          HTTP_STATUS.BAD_REQUEST
        );
      }
      newStatus = AdminVerifyStatus.REJECTED;
      rejectReason = reason;
    }

    const updateData = {
      isAdminVerifiedStatus: newStatus,
      adminRejectReason: rejectReason,
    };

    const updatedVendor = await this._vendorRepository.update(
      vendor?._id,
      updateData
    );

    return VendorMapper.toResponse(updatedVendor!);
  }

  // async toggleAdminVerification(vendorId: string): Promise<VendorResponseDto> {
  //   const vendor = await this._vendorRepository.findOne({ _id: vendorId });

  //   if (!vendor) {
  //     throw new AppError(
  //       ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  //       HTTP_STATUS.NOT_FOUND
  //     );
  //   }

  //   const updateVendor = await this._vendorRepository.updateById(vendorId, {
  //     isAdminVerified: !vendor.isAdminVerified,
  //   });

  //   return VendorMapper.toResponse(updateVendor!);
  // }

  /*----------------------
    toggle admin change status Block and unblock
   ------------------------------------------------*/

  async toggleAdminBlockVendor(vendorId: string): Promise<VendorResponseDto> {
    const vendor = await this._vendorRepository.findOne({ vendorId: vendorId });
    console.log("chekc the vendor id ", vendor);

    if (!vendorId) {
      throw new AppError(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    let newStatus = vendor?.status === "active" ? "blocked" : "active";

    const updateData: any = { status: newStatus };

    const updateVendorStatus = await this._vendorRepository.update(
      vendor?._id,
      updateData
    );
    return VendorMapper.toResponse(updateVendorStatus as IVendor);
  }

  /*----------------
get vendor details
----------------------------*/

  async getVendorById(vendorId: string): Promise<VendorResponseDto> {
    const vendor = await this._vendorRepository.findOne({ vendorId: vendorId });
    if (!vendor) {
      throw new AppError(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    return VendorMapper.toResponse(vendor);
  }

  /*-----------------
  vendor can reApply the rejectd verification 
  ---------------------------------------------------*/

  async reapplyForVendorVerification(
    vendorId: string
  ): Promise<VendorResponseDto> {
    const vendor = await this._vendorRepository.findOne({ vendorId });
    console.log(vendor);

    if (!vendor) {
      throw new AppError(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    if (vendor.isAdminVerifiedStatus !== "rejected") {
  throw new AppError(
    ERROR_MESSAGES.REAPPLY_ERROR,
    HTTP_STATUS.BAD_REQUEST
  );
}

const updatedVendor = await this._vendorRepository.update(vendor._id, {
  isAdminVerifiedStatus: AdminVerifyStatus.PENDING,
  adminRejectReason: null,
});
return VendorMapper.toResponse(updatedVendor!);

  }
}
