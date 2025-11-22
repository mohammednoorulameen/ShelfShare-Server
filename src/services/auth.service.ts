import { inject, injectable } from "tsyringe";
import { IAuthService } from "../types/service-interface/IAuthService";
import { IUserRepository } from "../types/repository-interface/IUserRepository";
import { IBcryptUtils } from "../types/common/IBcryptUtils";
import { userDto } from "../types/dtos/auth/createUser.dto";
import { IUser } from "../types/entities/IUser";
import AppError from "../shared/utils/App.Error";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { authEvents, AuthEvents } from "../events/auth.events";
import { v4 as uuidv4 } from "uuid";
import { IVendorRepository } from "../types/repository-interface/IVendorRepository";
import { Role } from "../shared/constant/roles";
import { RegisterDto } from "../types/dtos/auth/register.dto";
import { VendorDto } from "../types/dtos/auth/createVendor.dto";
import { IVendor } from "../types/entities/IVendor";
import { LoginDto } from "../types/dtos/auth/login.dto";
import { ERROR_MESSAGES } from "../shared/constant/messages";
import {
  ITokenPayload,
  ITokenService,
} from "../types/service-interface/ITokenService";
import { IAdminRepository } from "../types/repository-interface/IAdminRepository";

/*---------------------------
   this is role based authentication User,Vendor, Admin
 ----------------------------------------------------------*/

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository,
    @inject("IAdminRepository") private _adminRepository : IAdminRepository,
    @inject("IBcryptUtils") private _passwordBcrypt: IBcryptUtils,
    @inject("ITokenService") private _tokenService: ITokenService
  ) {}

  async register(data: RegisterDto): Promise<IUser | IVendor> {
    const { email, phoneNumber, password, imageKey, role } = data;

    /*-------------
    Role Based Email Checking
 ---------------------------------*/

    let existingAccount: IUser | IVendor | null = null;

    if (role === Role.USER) {
      existingAccount = await this._userRepository.findByEmail(email);
    }

    if (role === Role.VENDOR) {
      existingAccount = await this._vendorRepository.findByEmail(email);
    }

    /*-----------------
       Role based Email Existed Checking
     ---------------------------------------*/

    if (existingAccount) {
      if (existingAccount.isEmailVerified) {
        throw new AppError(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
      }
      if (role === Role.USER) {
        authEvents.emit(AuthEvents.UserRegistered, {
          email,
          role: Role.USER,
          userId: (existingAccount as IUser).userId,
        });
      }
      if (role === Role.VENDOR) {
        authEvents.emit(AuthEvents.VendorRegistered, {
          email,
          role: Role.VENDOR,
          vendorId: (existingAccount as IVendor).vendorId,
        });
      }

      throw new AppError( ERROR_MESSAGES.EMAIL_ALREADY_EXISTS_NOT_VERIFIED,HTTP_STATUS.BAD_REQUEST
      );
    }

    /*--------------
        Create New User and Vendor
      ------------------------------------*/

    const hashedPassword = await this._passwordBcrypt.hash(password);

    if (role === Role.USER) {
      const { userName, referralCode } = data as userDto;
      const newUser = await this._userRepository.create({
        userId: uuidv4(),
        userName,
        email,
        phoneNumber,
        imageKey: imageKey ?? "",
        referralCode: referralCode ?? "",
        password: hashedPassword,
        role: Role.USER,
      });
      authEvents.emit(AuthEvents.UserRegistered, {
        email,
        role: Role.USER,
        userId: newUser.userId,
      });

      return newUser;
    }

    if (role === Role.VENDOR) {
      const { bussinessName } = data as VendorDto;
      const newVendor = await this._vendorRepository.create({
        vendorId: uuidv4(),
        bussinessName,
        email,
        phoneNumber,
        imageKey: imageKey ?? "",
        password: hashedPassword,
        role: Role.VENDOR,
      });
      authEvents.emit(AuthEvents.VendorRegistered, {
        email,
        role: Role.VENDOR,
        vendorId: newVendor.vendorId,
      });
      return newVendor;
    }

    throw new AppError(ERROR_MESSAGES.INVALID_ROLE, HTTP_STATUS.BAD_REQUEST);
  }

  /*---------------------------
   Role based login Admin, User, Vendor
 ----------------------------------------------------------*/

  async login(
    data: LoginDto
  ): Promise<{ accessToken: string; refreshToken: string; data: any }> {
    const { email, password, role } = data;

    let account = null;

    if (role === Role.USER) {
      account = await this._userRepository.findByEmail(email);
    }
    if (role === Role.VENDOR) {
      account = await this._vendorRepository.findByEmail(email);
    }
    if (role === Role.ADMIN) {
       account = await this._adminRepository.findByEmail(email);
      if(!account || !(account as IUser).isAdmin){
        throw new  AppError(ERROR_MESSAGES.ACCOUNT_NOT_FOUND, HTTP_STATUS.NOT_FOUND)
      }
    }

    if (!account) {
      throw new AppError(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    // check email verified

    if (!account.isEmailVerified) {
      throw new AppError(
        ERROR_MESSAGES.EMAIL_NOT_VERIFIED,
        HTTP_STATUS.NOT_FOUND
      );
    }

    //Check password

    const isMatch = await this._passwordBcrypt.compare(
      password,
      account.password
    );
    if (!isMatch) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    // create the payload token

    const payload: ITokenPayload = {
      email: account.email,
      role: account.role,
    };
    if (role === Role.USER) {
      const user = account as IUser;
      payload.userId = user.userId;
    }

    if (role === Role.VENDOR) {
      const vendor = account as IVendor;
      payload.vendorId = vendor.vendorId;
    }
    const accessToken = this._tokenService.generateAccessToken(payload);
    const refreshToken = this._tokenService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      data: account,
    };
  }

   /*---------------------------
   Refresh Token 
 ----------------------------------------------------------*/

  async refreshAccessToken(refreshToken: string) {
    const decoded = this._tokenService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const payload: ITokenPayload = {
      email: decoded.email,
      role: decoded.role,
    };

    if (decoded.userId) payload.userId = decoded.userId;
    if (decoded.vendorId) payload.vendorId = decoded.vendorId;

    const newAccessToken = this._tokenService.generateAccessToken(payload);
    return { accessToken: newAccessToken };
  }

  
}
