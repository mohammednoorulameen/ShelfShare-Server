import { inject, injectable } from "tsyringe";
import { IAuthController } from "../../types/controller-interfaces/IAuthController";
import { IAuthService } from "../../types/service-interface/IAuthService";
import { IUser } from "../../types/entities/IUser";
import { Request, Response } from "express";
import { SUCCESS_MESSAGES } from "../../shared/constant/messages";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import { ApiResponse } from "../../types/common/ApiResponse";
// import { ITokenPayload } from "../../types/service-interface/ITokenService";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("IAuthService") private _authServices: IAuthService,
    // @inject("ITokenService") private _tokenServices : ITokenPayload
) {}
  async registerUser(req: Request, res: Response) {
    const user: IUser = await this._authServices.register(req.body);


    const data: Partial<IUser> = {
      email: user.email,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      password: user.password,
      imageKey: user.imageKey,

    };

    if (user.referralCode !== undefined) {
      data.referralCode = user.referralCode;
    }

    const response: ApiResponse<Partial<IUser>> = {
      success: true,
      message: SUCCESS_MESSAGES.REGISTRATION_SUCCESSFUL,
      data,
    };

    res.status(HTTP_STATUS.CREATED).json(response);
  }
}
