import { inject, injectable } from "tsyringe";
import { IVendorService } from "../../types/service-interface/IVendorService";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../shared/constant/messages";
import AppError from "../../shared/utils/App.Error";
import { IUserService } from "../../types/service-interface/IUserService";


@injectable()
export class AdminController {
  constructor(
    @inject("IVendorService") private _vendorService: IVendorService,
    @inject("IUserService") private _userService: IUserService
  ) {}

  async getAllVendors(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await this._vendorService.getAllVendors(page, limit);
    console.log("check result",result)
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.VENDOR_FETCHED_SUCCESS,
      ...result,
    });
  }



  /*------------------
   Admin toggle approve vendor
   --------------------------------------------*/

  async toggleAdminVerification(req:Request <{vendorId:string}>, res:Response): Promise<void>{
    const { vendorId } = req.params;

    if(!vendorId){
      throw new AppError(ERROR_MESSAGES.VENDOR_NOT_FOUNT, HTTP_STATUS.NOT_FOUND)
    }

    await this._vendorService.toggleAdminVerification(vendorId)

    res.status(HTTP_STATUS.OK).json({success : true, message: SUCCESS_MESSAGES.VENDOR_VERIFICATION_SUCCESS})
  }


  /*------------------
   Admin toggle block the vendor
   --------------------------------------------*/

   async toggleAdminBlockVendor(req:Request, res: Response): Promise<void>{
      const  {vendorId} = req.params

      if(!vendorId){
        throw new AppError(ERROR_MESSAGES.VENDOR_NOT_FOUNT, HTTP_STATUS.NOT_FOUND)
      }
      await this._vendorService.toggleAdminBlockVendor(vendorId)
      res.status(HTTP_STATUS.OK).json({success: true, message: SUCCESS_MESSAGES.VENDOR_SUCCESSFULLY_BLOCK})
   }


   /*--------
    Get All users with pagination
   ---------------------------------------*/

   async getAllUsers(req:Request, res: Response): Promise<void>{
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await this._userService.getAllUsers(page, limit);
    res.status(HTTP_STATUS.OK).json({
      success : true,
      message: SUCCESS_MESSAGES.USER_FETCHED_SUCCESS,
      ...result
    })
   }

   /*--------
   admin Block and unbloak
   ---------------------------------------*/

   async toggleAdminBlockUser(req:Request<{userId: string}>, res:Response): Promise<void>{
            
    const {userId} = req.params;
    if(!userId){
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUNT,HTTP_STATUS.NOT_FOUND);
    }

    await this._userService.toggleAdminBlockUser(userId);
     res.status(HTTP_STATUS.OK).json({success: true, message: SUCCESS_MESSAGES.USER_BLOCKED_SUCCESS})
   }



}
