import { inject, injectable } from "tsyringe";
import { IVerificationController } from "../../types/controller-interfaces/IVerificationController";
import { IVerificationServices } from "../../types/service-interface/IVerificationService";
import { HTTP_STATUS } from "../../shared/constant/http.status";
import { Request, Response } from "express";




@injectable()

export class VerificationController implements IVerificationController{
    constructor(
        @inject("IVerificationServices") private _verificationServices : IVerificationServices
    ){}
    
    async verifyBothEmail(req: Request, res: Response): Promise<void> {
        const token = req.query.token as string;

        const verifyied = await this._verificationServices.verifyEmail(token)
        res.status(HTTP_STATUS.OK).json({success: true, role: verifyied.role, verifyied})
    }
}