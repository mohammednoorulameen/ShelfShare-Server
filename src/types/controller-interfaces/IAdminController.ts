// import { controllerMethod } from "../common/controller.methodes";

import { ControllerMethod } from "../common/Controller.methodes";

export interface IAdminController {
    getAllVendors : ControllerMethod;
    toggleAdminVerification: ControllerMethod;
    toggleAdminBlockVendor: ControllerMethod;
    getAllUsers:ControllerMethod;
    toggleAdminBlockUser: ControllerMethod;
}