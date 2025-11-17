import { container } from "tsyringe";
import { IAuthService } from "../types/service-interface/IAuthService";
import { AuthService } from "../services/auth.service";



export class ServiceRegistey{
    static registerServices(): void{
        container.register<IAuthService>("IAuthService",{
            useClass : AuthService
        })
    }
}