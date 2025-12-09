import { container } from "tsyringe";
import { IAuthService } from "../types/service-interface/IAuthService";
import { AuthService } from "../services/auth.service";
import { IVerificationServices } from "../types/service-interface/IVerificationService";
import { VerificationServices } from "../services/verification.service";
import { ISendEmailServices } from "../types/service-interface/ISendEmailServices";
import { SendEmailServices } from "../services/sendEmail.service";
import { ITokenPayload, ITokenService } from "../types/service-interface/ITokenService";
import { TokenService } from "../services/jwt.service";
import { VendorService } from "../services/vendor.service";
import { IVendorService } from "../types/service-interface/IVendorService";
import { IUserService } from "../types/service-interface/IUserService";
import { UserService } from "../services/user.service";
import { CategoryService } from "../services/category.service";
import { ICategoryServices } from "../types/service-interface/ICategoryService";
import { ProductService } from "../services/product.service";
import { IProductService } from "../types/service-interface/IProductService";



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
        container.register<IVendorService>("IVendorService",{
            useClass : VendorService
        })
        container.register<IUserService>("IUserService",{
            useClass : UserService
        })
        container.register<ICategoryServices>("ICategoryServices",{
            useClass : CategoryService
        })
        container.register<IProductService>("IProductService",{
            useClass : ProductService
        })
    }
}