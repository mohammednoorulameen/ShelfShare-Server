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
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../shared/constant/messages";
import {
  ITokenPayload,
  ITokenService,
} from "../types/service-interface/ITokenService";
import { IAdminRepository } from "../types/repository-interface/IAdminRepository";
import { VendorMapper } from "../types/mapper/vendor.mapper";
import { config } from "../config";
import { OAuth2Client } from "google-auth-library";
import { GoogleLoginDto } from "../types/dtos/auth/googleLogin.dto";

/*---------------------------
   this is role based authentication User,Vendor, Admin
 ----------------------------------------------------------*/

@injectable()
export class AuthService implements IAuthService {
  private _frontendUrl: string;
  private _googleClient: OAuth2Client;
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository,
    @inject("IAdminRepository") private _adminRepository: IAdminRepository,
    @inject("IBcryptUtils") private _passwordBcrypt: IBcryptUtils,
    @inject("ITokenService") private _tokenService: ITokenService
  ) // @inject("") private _googleLogin:I
  {
    this._frontendUrl = config.cors.ALLOWED_ORIGIN;
    this._googleClient = new OAuth2Client(config.google.CLIENT_ID);
  }

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
        throw new AppError(
          ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
          HTTP_STATUS.CONFLICT
        );
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

      throw new AppError(
        ERROR_MESSAGES.EMAIL_ALREADY_EXISTS_NOT_VERIFIED,
        HTTP_STATUS.BAD_REQUEST
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
      data as VendorDto;
      const vendorData = VendorMapper.toEntity({
        ...data,
        password: hashedPassword,
      });
      console.log(vendorData);
      const newVendor = await this._vendorRepository.create(vendorData);
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
 console.log('account', data)
    let account = null;

    if (role === Role.USER) {
      console.log("account", account);
      account = await this._userRepository.findByEmail(email);
    }
    if (role === Role.VENDOR) {
      console.log("account", account);
      account = await this._vendorRepository.findByEmail(email);
      if (!account) {
        throw new AppError(
          ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND
        );
      }
      // if (!account.isAdminVerified) {
      //   throw new AppError(
      //     ERROR_MESSAGES.VENDOR_NOT_APPROVED,
      //     HTTP_STATUS.FORBIDDEN
      //   );
      // }
      if (account.status === "blocked") {
        throw new AppError(
          ERROR_MESSAGES.ADMIN_BLOCKED,
          HTTP_STATUS.UNAUTHORIZED
        );
      }
    }
    if (role === Role.ADMIN) {
      account = await this._adminRepository.findByEmail(email);
      if (!account || !(account as IUser).isAdmin) {
        throw new AppError(
          ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND
        );
      }
    }

    if (!account) {
       console.log('account', account)
      throw new AppError(
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    // check email verified

    // if (!account.isEmailVerified) {
    //   throw new AppError(
    //     ERROR_MESSAGES.EMAIL_NOT_VERIFIED,
    //     HTTP_STATUS.NOT_FOUND
    //   );
    // }

    // if (account.status === "blocked") {
    //   throw new AppError(
    //     ERROR_MESSAGES.ADMIN_BLOCKED,
    //     HTTP_STATUS.UNAUTHORIZED
    //   );
    // }

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

  /*-------
   Refresh Token 
  ---------------------*/

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

  /*---------
    user google authentication
   --------------------------------*/

  async googleLogin(
    data: GoogleLoginDto
  ): Promise<{ accessToken: string; refreshToken: string; data: any }> {
    const { idToken } = data;

    const ticket = await this._googleClient.verifyIdToken({
      idToken,
      audience: config.google.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const email = payload.email;
    const name = payload.name || "";
    const picture = payload.picture || "";

    let account: IUser | null = await this._userRepository.findByEmail(email);

    if (!account) {
      const randomPassword = uuidv4();
      const hashedPassword = await this._passwordBcrypt.hash(randomPassword);

      account = await this._userRepository.create({
        userId: uuidv4(),
        userName: name || email.split("@")[0],
        email,
        phoneNumber: "",
        imageKey: picture,
        referralCode: "",
        password: hashedPassword,
        role: Role.USER,
        isEmailVerified: true,
        provider: "google",
      } as any);
    }

    if ((account as any).status === "blocked") {
      throw new AppError(
        ERROR_MESSAGES.ADMIN_BLOCKED,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const payloadToken: ITokenPayload = {
      email: account.email,
      role: account.role,
      userId: account.userId,
    };

    const accessToken = this._tokenService.generateAccessToken(payloadToken);
    const refreshToken = this._tokenService.generateRefreshToken(payloadToken);

    return {
      accessToken,
      refreshToken,
      data: account,
    };
  }
}
