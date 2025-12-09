import { container } from "tsyringe";
import { IAuthController } from "../types/controller-interfaces/IAuthController";
import { AuthController } from "../controllers/auth/auth.controller";
import { IVerificationController } from "../types/controller-interfaces/IVerificationController";
import { VerificationController } from "../controllers/auth/verification.controller";
import { IAdminController } from "../types/controller-interfaces/IAdminController";
import { AdminController } from "../controllers/admin/admin.controller";
import { IUserController } from "../types/controller-interfaces/IUserController";
import { UserController } from "../controllers/user/user.controller";
import { IVendorController } from "../types/controller-interfaces/IVendorController";
import { VendorController } from "../controllers/vendor/vendor.controller";
import { ICategoryController } from "../types/controller-interfaces/ICategoryController";
import { ProductController } from "../controllers/vendor/product.controller";
import { IProductController } from "../types/controller-interfaces/IProductController";
import { CategoryController } from "../controllers/category/category.controller";
// import { UserController } from "../controllers/user/user.controller";



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
        container.register<IUserController>("IUserController",{
            useClass: UserController
        })
        container.register<IVendorController>("IVendorController",{
            useClass: VendorController
        })
        container.register<ICategoryController>("ICategoryController",{
            useClass: CategoryController
        })
        container.register<IProductController>("IProductController",{
            useClass: ProductController
        })

    }
}