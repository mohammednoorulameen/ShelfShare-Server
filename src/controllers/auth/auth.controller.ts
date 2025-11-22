import { inject, injectable } from "tsyringe";
import { IAuthController } from "../../types/controller-interfaces/IAuthController";
import { IAuthService } from "../../types/service-interface/IAuthService";
import { IUser } from "../../types/entities/IUser";
import { Request, Response } from "express";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../shared/constant/messages";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import { ApiResponse } from "../../types/common/ApiResponse";
import { RegisterDto } from "../../types/dtos/auth/register.dto";
import { Role } from "../../shared/constant/roles";
import { IVendor } from "../../types/entities/IVendor";
import AppError from "../../shared/utils/App.Error";
import { clearCookie } from "../../shared/utils/cookie.helper";

let accessMaxAge = 15 * 60 * 1000;
let refreshMaxAge = 7 * 24 * 60 * 60 * 1000;

function isUser(obj: IUser | IVendor): obj is IUser {
  return obj.role === Role.USER;
}

function isVendor(obj: IUser | IVendor): obj is IVendor {
  return obj.role === Role.VENDOR;
}
@injectable()
export class AuthController implements IAuthController {
  constructor(@inject("IAuthService") private _authServices: IAuthService) {}

  /*------------------
   User, Vendor and Register Controller
   --------------------------------------------*/

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

  /*------------------
   User, Vendor and Admin Login Controller
   --------------------------------------------*/

  async loginBoth(req: Request, res: Response): Promise<void> {
    const result = await this._authServices.login(req.body);

    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSit: "strict" as const,
      path: "/",
    };

    // accesstoken
    res.cookie("accessToken", result.accessToken, {
      ...tokenOption,
      maxAge: accessMaxAge,
    });

    //refreshToken

    res.cookie("refreshToken", result.refreshToken, {
      ...tokenOption,
      maxAge: refreshMaxAge,
    });

    let responseData: any = {
      email: result.data.email,
      role: result.data.role,
    };

    if (isUser(result.data)) {
      responseData.userId = result.data.userId;
    }

    if (isVendor(result.data)) {
      responseData.vendorId = result.data.vendorId;
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
      data: responseData,
    });
  }

  /*----------
   Refresh Token Controller 
   --------------------------------*/

  async refreshAccessToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        ERROR_MESSAGES.REFRESH_TOKEN_MISSING,
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    const result = await this._authServices.refreshAccessToken(refreshToken);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "New access token created",
      accessToken: result.accessToken,
    });
  }

  /*-------
   Role based Logout
   -----------------------*/

  async logout(req: Request, res: Response): Promise<void> {
    const role = req.user?.role ?? null;
    clearCookie(res, "accessToken");
    clearCookie(res, "refreshToken");

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESSFULLY,role });
  }
}
