import { inject, injectable } from "tsyringe";
import { IVerificationController } from "../../types/controller-interfaces/IVerificationController";
import { IVerificationServices } from "../../types/service-interface/IVerificationService";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import { Request, Response } from "express";
import { SUCCESS_MESSAGES } from "../../shared/constant/messages";

@injectable()
export class VerificationController implements IVerificationController {
  constructor(
    @inject("IVerificationServices")
    private _verificationServices: IVerificationServices
  ) {}

  async verifyBothEmail(req: Request, res: Response): Promise<void> {
    const token = req.query.token as string;

    const verifyied = await this._verificationServices.verifyEmail(token);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, role: verifyied.role, verifyied });
  }

  /*-------
    Role based Request Forgot Password 
    -----------------------*/

  async verifyForgotPassword(req: Request, res: Response): Promise<void> {
    const { email , role } = req.body.data;
    await this._verificationServices.sendForgotPassword(email , role);
    res.status(HTTP_STATUS.OK).json({ message: SUCCESS_MESSAGES.EMAIL_SEND });
  }


    /*-------
    verify the token
    -----------------------*/


  async verifyForgotToken (req:Request,res: Response): Promise<void>{
     const token = req.query.token as string;
     console.log(token)
     const decoded = await this._verificationServices.verifyForgotToken(token);
     res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.EMAIL_VERIFIED,
      role: decoded.role, 
    });
  }



    async resetPassword(req: Request, res: Response): Promise<void> {
      const { newPassword, token } = req.body;

      await this._verificationServices.resetPassword(token, newPassword);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS,
      });
    }
}
