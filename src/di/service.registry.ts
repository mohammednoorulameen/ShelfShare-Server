import { container } from "tsyringe";
import { IAuthService } from "../types/service-interface/IAuthService";
import { AuthService } from "../services/auth.service";
import { IVerificationServices } from "../types/service-interface/IVerificationService";
import { VerificationServices } from "../services/verification.service";
import { ISendEmailServices } from "../types/service-interface/ISendEmailServices";
import { SendEmailServices } from "../services/sendEmail.service";
import { ITokenPayload, ITokenService } from "../types/service-interface/ITokenService";
import { TokenService } from "../services/jwt.service";



export class ServiceRegistey{
    static registerServices(): void{
        container.register<IAuthService>("IAuthService",{
            useClass : AuthService
        });
        container.register<IVerificationServices>("IVerificationServices",{
            useClass : VerificationServices
        })
        container.register<ISendEmailServices>("ISendEmailServices",{
            useClass : SendEmailServices
        })
        container.register<ITokenService>("ITokenService",{
            useClass : TokenService
        })
    }
}