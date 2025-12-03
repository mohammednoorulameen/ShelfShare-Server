import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IUserService } from "../../types/service-interface/IUserService";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import AppError from "../../shared/utils/App.Error";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../shared/constant/messages";

@injectable()
export class UserController {
  constructor(@inject("IUserService") private _userService: IUserService) {}




  async getUser(req:Request,res: Response): Promise <void>{
    const userId = req.user?.userId;
    if(!userId){
       throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    const user = await this._userService.getUserById(userId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.DATA_FETCHED,
    data: user,
  });
  }



  /*-------
    Update user info controller 
   -------------------------------*/

  async updateUserInfo(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    const { userName, phoneNumber, imageKey } = req.body;
    console.log('check data s', imageKey)


    const updatedUser = await this._userService.updateUserInfo({
      userId,
      userName,
      phoneNumber,
      imageKey,
    });

    res.status(HTTP_STATUS.OK).json({
      message: SUCCESS_MESSAGES.PROFILE_UPDATED_SUCCESSFULLY,
      data: updatedUser,
    });
  }

  /*-------
  upadate password controller 
  -------------------------------*/

  async updateUserPassword(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError(
        ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new AppError(
        ERROR_MESSAGES.PASSWORD_REQUIRED,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const updatedUser = await this._userService.updateUserPassword({
      userId,
      oldPassword,
      newPassword,
    });
    console.log(oldPassword, newPassword);
    res.status(HTTP_STATUS.OK).json({
      message: SUCCESS_MESSAGES.PASSWORD_UPDATED_SUCCESSFULLY,
      data: updatedUser,
    });
  }
}
