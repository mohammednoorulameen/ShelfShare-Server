import { container } from "tsyringe";
import { IAuthController } from "../types/controller-interfaces/IAuthController";
import { AuthController } from "../controllers/auth/auth.controller";
import { IVerificationController } from "../types/controller-interfaces/IVerificationController";
import { VerificationController } from "../controllers/auth/verification.controller";
import { IAdminController } from "../types/controller-interfaces/IAdminController";
import { AdminController } from "../controllers/admin/admin.controller";



export class ControllerRegistry{
    static registerController(): void{
        container.register<IAuthController>("IAuthController",{
            useClass : AuthController
        })

        container.register<IVerificationController>("IVerificationController",{
            useClass : VerificationController
        })

        container.register<IAdminController>("IAdminController",{
            useClass: AdminController
        })
    }
}