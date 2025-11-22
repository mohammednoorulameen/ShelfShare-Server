// import { controllerMethod } from "../common/controller.methodes";

import { ControllerMethod } from "../common/Controller.methodes";

export interface IAuthController {
    registerUserVendor : ControllerMethod;
    loginBoth: ControllerMethod,
    logout : ControllerMethod
    refreshAccessToken: ControllerMethod
}