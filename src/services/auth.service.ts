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

/**
 * this is role based authentication User,Vendor, Admin
 */

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository,
    @inject("IBcryptUtils") private _passwordBcrypt: IBcryptUtils
  ) {}

  async register(data: RegisterDto): Promise<IUser | IVendor> {
    const { email, phoneNumber, password, imageKey, role } = data;

    // -------------------- check the email already existed vendor and user --------------------
    // const userExist = await this._userRepository.findByEmail(email);
    // const vendorExist = await this._vendorRepository.findByEmail(email);

      console.log(email)


    // -------------- Role Based Email Checking  --------------

    let existingAccount: IUser | IVendor | null = null;

    if (role === Role.USER) {
      existingAccount = await this._userRepository.findByEmail(email);
    }

    if (role === Role.VENDOR) {
      existingAccount = await this._vendorRepository.findByEmail(email);
    }

    // -------------- Role based Email Existed Checking  --------------

    if (existingAccount) {
      if (existingAccount.isEmailVerified) {
        throw new AppError("Email already registered", HTTP_STATUS.CONFLICT);
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
        "Email exists but not verified. Verification Email Resent",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // -------------- Create New User and Vendor --------------
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

    throw new AppError("Invalid role type", HTTP_STATUS.BAD_REQUEST);
  }
}
