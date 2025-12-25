import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import AppError from "../../shared/utils/App.Error";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../shared/constant/messages";
import { IVendorService } from "../../types/service-interface/IVendorService";
import { IVendorController } from "../../types/controller-interfaces/IVendorController";

@injectable()
export class VendorController  implements IVendorController{
  constructor(@inject("IVendorService") private _vendorService: IVendorService) {}



  /* ================= GET VENDOR DETAILS================= */

  async getVendor(req:Request,res: Response): Promise <void>{
    const vendorId = req.vendor?.vendorId;
    if(!vendorId){
       throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    const vendor = await this._vendorService.getVendorById(vendorId);
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.DATA_FETCHED,
    data: vendor,
  });
  }


  /* ================= VENDOR CAN REAPPLY THE REJECTED VERIFICATION ================= */


  async reapplyForVendorVerification(req:Request, res:Response): Promise<void>{
    const vendorId = req.vendor?.vendorId
    console.log('check the vednorId getting to the vendor ',vendorId)
    if(!vendorId){
      throw new AppError(ERROR_MESSAGES.UNAUTHORIZED_ACCESS, HTTP_STATUS.UNAUTHORIZED);
    }

    const updatedVendor = await this._vendorService.reapplyForVendorVerification(vendorId)
   res.status(HTTP_STATUS.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.REAPPLY_SUCCESSFULLY,
    data: updatedVendor,
  });
  }








}
