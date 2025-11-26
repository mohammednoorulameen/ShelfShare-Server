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
import { IUser } from "../types/entities/IUser";
import { BcryptUtils } from "../shared/utils/password.utils";
import { IBcryptUtils } from "../types/common/IBcryptUtils";

@injectable()
export class VerificationServices implements IVerificationServices {
  private _frontendUrl: string;

  constructor(
    @inject("ISendEmailServices") private _emailServices: ISendEmailServices,
    @inject("ITokenService") private _tokenServices: ITokenService,
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository,
    @inject("IBcryptUtils") private _passwordBcrypt: IBcryptUtils
  ) {
    this._frontendUrl = config.cors.ALLOWED_ORIGIN;
  }

  /*-----------------
   Send Email Verification
 -----------------------------------------------*/

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

  /*-----------------
   Role based Verifyign the emailtoken 
 -----------------------------------------------*/

  async verifyEmail(token: string): Promise<{ message: string; role: Role }> {
    if (!token) {
      throw new AppError(
        "Invalid Verification token ",
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const decoded = this._tokenServices.verifyEmailToken(token);

    if (!decoded) {
      throw new AppError(
        ERROR_MESSAGES.TOKEN_EXPIRED_OR_INVALID,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    let account = null;

    if (decoded?.role === Role.USER) {
      account = await this._userRepository.findByEmail(decoded.email);
      if (!account) {
        throw new AppError(
          ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
          HTTP_STATUS.BAD_REQUEST
        );
      }
    }

    if (decoded?.role === Role.VENDOR) {
      account = await this._vendorRepository.findByEmail(decoded.email);
      if (!account) {
        throw new AppError(
          ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
          HTTP_STATUS.BAD_REQUEST
        );
      }
    }

    if (!account) {
      throw new AppError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (account.isEmailVerified) {
      throw new AppError(
        SUCCESS_MESSAGES.EMAIL_ALREADY_VERIFIED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (decoded.role === Role.USER) {
      await this._userRepository.updateOne(account.email, {
        isEmailVerified: true,
      });
    }

    if (decoded.role === Role.VENDOR) {
      await this._vendorRepository.updateOne(account.email, {
        isEmailVerified: true,
      });
    }

    return {
      message: SUCCESS_MESSAGES.EMAIL_VERIFIED,
      role: decoded.role,
    };
  }

  /*-------
   Forgot password
  ---------------------*/

  async sendForgotPassword(email: string,role: Role): Promise<void> {
    console.log("Paramas",email , role)
    const user = await this._userRepository.findByEmail(email);
    const vendor = await this._vendorRepository.findByEmail(email);
    if (!user && !vendor) {
      throw new AppError(ERROR_MESSAGES.EMAIL_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
      let account = null;
     if (role === Role.USER) {
    account = await this._userRepository.findByEmail(email);
  } else if (role === Role.VENDOR) {
    account = await this._vendorRepository.findByEmail(email);
  }
    if (!account) {
    throw new AppError(ERROR_MESSAGES.EMAIL_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

    // const role = user ? Role.USER : Role.VENDOR;
    // const email = user ? user.email : vendor!.email;

    const EmailToken = this._tokenServices.generateEmailToken({ email: email, role });

    const resetPathLink = `${this._frontendUrl}/auth/forgot-password/verify?token=${EmailToken}`;

    await this._emailServices.sendForgotEmail(
      email,
      SUCCESS_MESSAGES.SEND_EMAIL_VERIFIACTION,
      resetPathLink
    );
  }

  /*------------
    verify forgot password
   ----------------*/

  async verifyForgotToken(
    token: string
  ): Promise<{ email: string; role: Role }> {
    if (!token) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const decoded = this._tokenServices.verifyEmailToken(token);
    if (!decoded) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (!decoded.email || !decoded.role) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    console.log("frh3iuhfbuoqr3bfluihbfloiruhbelfnirueblicheic", decoded.role);
    return { email: decoded.email, role: decoded.role };
  }

  /*------------
    reset password
   ----------------*/

  async resetPassword(token: string, newPassword: string): Promise<void> {
    if (!token) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const decoded = this._tokenServices.verifyEmailToken(token);


    if (!decoded?.role) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const { email, role } = decoded;

    if (!email) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const hashedPassword = await this._passwordBcrypt.hash(newPassword);

    if (role == Role.USER) {
      await this._userRepository.updateOne(email, { password: hashedPassword });
    }
    if (role === Role.VENDOR) {
      await this._vendorRepository.updateOne(email, {
        password: hashedPassword,
      });
    }
  }
}
