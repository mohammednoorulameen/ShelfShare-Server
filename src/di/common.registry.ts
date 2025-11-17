import { container } from "tsyringe";
import { IBcryptUtils } from "../types/common/IBcryptUtils";
import { BcryptUtils } from "../shared/utils/password.utils";
import { ErrorHandlingMiddleWare } from "../middlewares/error.handling.middleware";



export class CommonRegistery{
    static registerCommon(): void {
        container.register<IBcryptUtils>("IBcryptUtils", {
            useClass : BcryptUtils
        });
        container.register<ErrorHandlingMiddleWare>("ErrorHandlingMiddleWare", {
            useClass : ErrorHandlingMiddleWare
        })
    }
}