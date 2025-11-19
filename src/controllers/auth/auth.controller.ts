import { inject, injectable } from "tsyringe";
import { IAuthController } from "../../types/controller-interfaces/IAuthController";
import { IAuthService } from "../../types/service-interface/IAuthService";
import { IUser } from "../../types/entities/IUser";
import { Request, Response } from "express";
import { SUCCESS_MESSAGES } from "../../shared/constant/messages";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import { ApiResponse } from "../../types/common/ApiResponse";
import { RegisterDto } from "../../types/dtos/auth/register.dto";
import { Role } from "../../shared/constant/roles";
import { IVendor } from "../../types/entities/IVendor";
// import { ITokenPayload } from "../../types/service-interface/ITokenService";

function isUser(obj: IUser | IVendor): obj is IUser {
  return obj.role === Role.USER;
}

function isVendor(obj: IUser | IVendor): obj is IVendor {
  return obj.role === Role.VENDOR;
}
@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("IAuthService") private _authServices: IAuthService 
    // @inject("ITokenService") private _tokenServices : ITokenPayload
  ) {}
  async registerUserVendor(req: Request<{}, {}, RegisterDto>, res: Response) {
    const result = await this._authServices.register(req.body);
    let message: string = SUCCESS_MESSAGES.REGISTRATION_SUCCESSFUL_USER;
    let responseData: Partial<IUser | IVendor> = {};

    if (isUser(result)) {
      responseData = {
        email: result.email,
        userName: result.userName,
        phoneNumber: result.phoneNumber,
        imageKey: result.imageKey ?? undefined,
        referralCode: result.referralCode ?? undefined,
      };

      message = SUCCESS_MESSAGES.REGISTRATION_SUCCESSFUL_USER;
      
    } else if (isVendor(result)) {
      responseData = {
        email: result.email,
        bussinessName: result.bussinessName,
        phoneNumber: result.phoneNumber,
        imageKey: result.imageKey ?? undefined,
      };
      message = SUCCESS_MESSAGES.REGISTRATION_SUCCESSFUL_VENDOR;
    }

    const response: ApiResponse<typeof responseData> = {
      success: true,
      message,
      data: responseData,
    };
    res.status(HTTP_STATUS.CREATED).json(response);
  }
}




// import { inject, injectable } from "tsyringe";
// import { IAuthController } from "../../types/controller-interfaces/IAuthController";
// import { IAuthService } from "../../types/service-interface/IAuthService";
// import { IUser } from "../../types/entities/IUser";
// import { Request, Response } from "express";
// import { SUCCESS_MESSAGES } from "../../shared/constant/messages";
// import { HTTP_STATUS } from "../../shared/constant/http.status";
// import { ApiResponse } from "../../types/common/ApiResponse";
// // import { ITokenPayload } from "../../types/service-interface/ITokenService";

// @injectable()
// export class AuthController implements IAuthController {
//   constructor(
//     @inject("IAuthService") private _authServices: IAuthService,
//     // @inject("ITokenService") private _tokenServices : ITokenPayload
// ) {}
//   async registerUser(req: Request, res: Response) {
//     const user: IUser = await this._authServices.register(req.body);

//     const data: Partial<IUser> = {
// email: user.email,
// userName: user.userName,
// phoneNumber: user.phoneNumber,
// password: user.password,
// imageKey: user.imageKey,

//     };

// if (user.referralCode !== undefined) {
//   data.referralCode = user.referralCode;
// }

//     const response: ApiResponse<Partial<IUser>> = {
//       success: true,
//       message: SUCCESS_MESSAGES.REGISTRATION_SUCCESSFUL,
//       data,
//     };

//     res.status(HTTP_STATUS.CREATED).json(response);
//   }

// }
