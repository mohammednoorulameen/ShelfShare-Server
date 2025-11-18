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

    // check the email already existed vendor and user
    const userExist = await this._userRepository.findByEmail(email);
    const vendorExist = await this._vendorRepository.findByEmail(email);

    console.log(email, phoneNumber, role);

    if (userExist || vendorExist) {
      throw new AppError("Email Already Existed", HTTP_STATUS.CONFLICT);
    }

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
      authEvents.emit(AuthEvents.UserRegistered, { userEmail: email });

      console.log("check user authEvents", authEvents);

      return newUser;
    }

    if (role === Role.VENDOR) {
        const {bussinessName} = data as VendorDto
      const newVendor = await this._vendorRepository.create({
        vendorId: uuidv4(),
        bussinessName,
        email,
        phoneNumber,
        imageKey: imageKey ?? "",
        password: hashedPassword,
        role: Role.VENDOR,
      });
      return  newVendor
    }

    throw new  AppError("Invalid role type", HTTP_STATUS.BAD_REQUEST)


  }
}
