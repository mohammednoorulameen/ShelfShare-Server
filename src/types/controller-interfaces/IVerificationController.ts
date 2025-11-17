import { ControllerMethod } from "../common/Controller.methodes";


export interface IVerificationController{
    verifyEmail: ControllerMethod,
    resendEmail : ControllerMethod,
}