import { ControllerMethod } from "../common/Controller.methodes";


export interface IVerificationController{
    verifyBothEmail: ControllerMethod,
    verifyForgotPassword : ControllerMethod;
     verifyForgotToken: ControllerMethod;
    resetPassword : ControllerMethod
}