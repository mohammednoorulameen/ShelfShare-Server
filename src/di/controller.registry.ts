import { container } from "tsyringe";
import { IAuthController } from "../types/controller-interfaces/IAuthController";
import { AuthController } from "../controllers/auth/auth.controller";


export class ControllerRegistry{
    static registerController(): void{
        container.register<IAuthController>("IAuthController",{
            useClass : AuthController
        })
    }
}