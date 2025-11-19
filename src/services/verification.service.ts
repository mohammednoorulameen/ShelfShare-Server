import { inject, injectable } from "tsyringe";
import { IVerificationServices } from "../types/service-interface/IVerificationService";

import {
  ITokenPayload,
  ITokenService,
} from "../types/service-interface/ITokenService";
import { IUserRepository } from "../types/repository-interface/IUserRepository";
import { config } from "../config";
import AppError from "../shared/utils/App.Error";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../shared/constant/messages";
import { HTTP_STATUS } from "../shared/constant/http.status";
import { ISendEmailServices } from "../types/service-interface/ISendEmailServices";
import { IVendorRepository } from "../types/repository-interface/IVendorRepository";
import { Role } from "../shared/constant/roles";

@injectable()
export class VerificationServices implements IVerificationServices {
  private _frontendUrl: string;

  constructor(
    @inject("ISendEmailServices") private _emailServices: ISendEmailServices,
    @inject("ITokenService") private _tokenServices: ITokenService,
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository
  ) {
    this._frontendUrl = config.cors.ALLOWED_ORIGIN;
  }


  /**
   * send verification email
   */

  async sendVerificationEmail(
    toEmail: string,
    role: Role,
    id?: string
  ): Promise<void> {
    console.log("check this email", toEmail);

    let account = null;

    if (role === Role.USER) {
      account = await this._userRepository.findByEmail(toEmail);
    }
    if (role === Role.VENDOR) {
      account = await this._vendorRepository.findByEmail(toEmail);
    }

    if (!account || account.isEmailVerified) {
      throw new AppError(
        ERROR_MESSAGES.USER_NOTEXIST_ALREADY_VERIFIED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const payload: ITokenPayload = {
      email: toEmail,
      role,
    };


    
    if (role === Role.USER && id) payload.userId = id;
    if (role === Role.VENDOR && id) payload.vendorId = id;
    const EmailToken = this._tokenServices.generateEmailToken(payload);

    const verificationLink = `${this._frontendUrl}/auth/emailverification?token=${EmailToken}`;

    await this._emailServices.sendEmailVerification(
      toEmail,
      SUCCESS_MESSAGES.SEND_EMAIL_VERIFIACTION,
      verificationLink
    );
  }




async verifyEmail(token:string):Promise<void>{
  if(!token){
    throw new AppError("Invalid Verification token ",HTTP_STATUS.BAD_REQUEST)
  }

const decoded  = this._tokenServices.verifyEmailToken(token)

if(!decoded){
   throw new AppError(ERROR_MESSAGES.TOKEN_EXPIRED_OR_INVALID, HTTP_STATUS.BAD_REQUEST);
}

let account = null;

if(decoded?.role === Role.USER){
   account = await this._userRepository.findByEmail(decoded.email)
}
if(decoded?.role === Role.VENDOR){
   account = await this._vendorRepository.findByEmail(decoded.email)
}

  if (!account) {
    throw new AppError(ERROR_MESSAGES.EMAIL_NOT_FOUND, HTTP_STATUS.BAD_REQUEST);
  }

if(account.isEmailVerified){
  throw new AppError(SUCCESS_MESSAGES.EMAIL_ALREADY_VERIFIED,HTTP_STATUS.BAD_REQUEST)
}


 if (decoded.role === Role.USER) {
    await this._userRepository.updateOne(account.email, {
      isEmailVerified: true,
    });
  }

  if(decoded.role === Role.VENDOR){
    await this._vendorRepository.updateOne(account.email,{
      isEmailVerified: true,
    })
  }


}

}



